---
title: "How To Install\_.Net Core Runtime In Service Fabric Using Terraform"
description: We have decided to install .NET Core runtime in the Azure Service Fabric cluster to reduce the package size deployed to the cluster. We already had Terraform templates for Virtual Machine Scale Sets.
date: '2020-07-04T13:38:13.504Z'
keywords: ["Net Core", "Service Fabric", "Powershell", "Terraform", "Azure"]
slug: how-to-install-net-core-runtime-in-service-fabric-using-terraform
canonical: https://medium.com/swlh/how-to-install-net-core-runtime-in-service-fabric-using-terraform-dcca95dedb74
---

![Photo by [Jefferson Santos](https://unsplash.com/@jefflssantos?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](man-sitting-at-the-laptop-in-the-dark.jpg)

In this article, I am going to share my own experience and thought process since I could not find existing tutorials on how to do that. Recently, we have decided to install .NET Core runtime in the Service Fabric cluster to reduce the package size deployed to the cluster. It should reduce the deployment time for many .NET Core applications. Currently, we are using self-contained deployments, which result in deploying large packages that take a long time.

## First Attempt

In the beginning, I thought that this is a straightforward task to do, but I was so wrong. Why did I think that this is going to be easy? Well, we already had Terraform templates for the [Service Fabric cluster](https://www.terraform.io/docs/providers/azurerm/r/service_fabric_cluster.html) and [Virtual Machine Scale Sets](https://www.terraform.io/docs/providers/azurerm/r/virtual_machine_scale_set.html) (VMSS). We also had the .NET Framework 4.8 installation on VMSS via Powershell (.ps1) script added to the Terraform template as an extension to the VMSS.

```json
extension {
    name                       = "InstallDotNet"
    publisher                  = "Microsoft.Compute"
    type                       = "CustomScriptExtension"
    type_handler_version       = "1.8"
    auto_upgrade_minor_version = true
    settings                   = <<EOF
    {
      "fileUris": [
        "https://yourblobstorageaccount.blob.core.windows.net/dotnet48/InstallDotNet-48.ps1"
      ],
      "commandToExecute": "powershell -ExecutionPolicy Unrestricted -File InstallDotNet-48.ps1"
    }
    EOF
  }
```

First, I decided to look for a .ps1 script that could install the runtime non-interactively. It turned out that Microsoft already had such a [script](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script#recommended-version). I thought, great let me download it and add to the existing Terraform VMSS configuration as an additional extension. I did that and the result looked good, so I created a Pull Request (PR). My coworkers reviewed it, and also Terraform validation passed. After completing the PR, the feature branch was merged to the dev branch, and automatic deployment started to the dev environment. As you might probably guess, it did not work quite well. Unfortunately, Azure does not support many extensions of the same type.

## Second Attempt

All right, not a big deal, I will add this logic to the existing extension, which installs .NET Framework 4.8. I used the pipe operator to combine multiple .ps1 commands.

```powershell
powershell -ExecutionPolicy Unrestricted -File InstallDotNet-48.ps1 && powershell -ExecutionPolicy Unrestricted -File dotnet-install.ps1 -Runtime dotnet -Channel 2.1 && powershell -ExecutionPolicy Unrestricted -File dotnet-install.ps1 -Runtime dotnet -Channel 3.1
```

I changed the Terraform template again and repeated the deployment process. Unfortunately, the deployment failed due to unable to download the needed files for the .NET Core runtime. Something was blocking the download of the files. My next move was to connect to the one of the Virtual Machines (VM) and launch the .NET Core installation .ps1 script manually to check what went wrong. I was able to reproduce the issue. Ok, how can I solve it? I started to research. After searching for some time, I found a possible solution in the documentation: [https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script#examples](https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script#examples). Scroll down until “Obtain script and install .NET Core CLI one-liner examples” section.

```powershell
\# Run a separate PowerShell process because the script calls exit, so it will end the current PowerShell session.  
&powershell -NoProfile -ExecutionPolicy unrestricted -Command "\[Net.ServicePointManager\]::SecurityProtocol = \[Net.SecurityProtocolType\]::Tls12; &(\[scriptblock\]::Create((Invoke-WebRequest -UseBasicParsing '[https://dot.net/v1/dotnet-install.ps1'](https://dot.net/v1/dotnet-install.ps1%27)))) <additional install-script args>"
```

This piece of code below helped to solve the problem since only Ssl3 and Tls security protocols were enabled in the PowerShell session on Windows Server 2016 Datacenter.

```powershell
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12;
```

I modified the Terraform template again and repeated the deployment process.

```powershell
powershell -ExecutionPolicy Unrestricted -File InstallDotNet-48.ps1 && powershell -NoProfile -ExecutionPolicy unrestricted -Command \\"\[Net.ServicePointManager\]::SecurityProtocol = \[Net.SecurityProtocolType\]::Tls12; &(\[scriptblock\]::Create((Invoke-WebRequest -UseBasicParsing '[https://dot.net/v1/dotnet-install.ps1'](https://dot.net/v1/dotnet-install.ps1%27)))) -Runtime dotnet -Channel 2.1 \\" && powershell -NoProfile -ExecutionPolicy unrestricted -Command \\"\[Net.ServicePointManager\]::SecurityProtocol = \[Net.SecurityProtocolType\]::Tls12; &(\[scriptblock\]::Create((Invoke-WebRequest -UseBasicParsing '[https://dot.net/v1/dotnet-install.ps1'](https://dot.net/v1/dotnet-install.ps1%27)))) -Runtime dotnet -Channel 3.1 \\"
```

This time the deployment finished successfully, but there was another issue to solve.

## Third Attempt

It turned out that .NET Core apps expect the runtime to be in `C:\Program Files\dotnet` directory, but the .NET Core .ps1 installation script installs the runtime in the user profile folder by default.

There are two ways to solve this:

* Change the installation directory to the `C:\Program Files\dotnet`.
* Add the `DOTNET_ROOT` environment variable with the path to the custom location of the `dotnet.exe`.

I decided to add the installation directory argument to install it in the default directory. The result looks like this:

```json
extension {
    name                       = "InstallDotNet"
    publisher                  = "Microsoft.Compute"
    type                       = "CustomScriptExtension"
    type_handler_version       = "1.8"
    auto_upgrade_minor_version = true
    settings                   = <<EOF
    {
      "fileUris": [
        "https://yourblobstorageaccount.blob.core.windows.net/dotnet48/InstallDotNet-48.ps1"
      ],
      "commandToExecute": "powershell -ExecutionPolicy Unrestricted -File InstallDotNet-48.ps1 && powershell -NoProfile -ExecutionPolicy unrestricted -Command \"[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; &([scriptblock]::Create((Invoke-WebRequest -UseBasicParsing 'https://dot.net/v1/dotnet-install.ps1'))) -Runtime dotnet -Channel 2.1 -InstallDir 'C:\\Program Files\\dotnet' \" && powershell -NoProfile -ExecutionPolicy unrestricted -Command \"[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12; &([scriptblock]::Create((Invoke-WebRequest -UseBasicParsing 'https://dot.net/v1/dotnet-install.ps1'))) -Runtime dotnet -Channel 3.1 -InstallDir 'C:\\Program Files\\dotnet' \""
    }
    EOF
  }
```

And this finally worked! My colleague made sure that it works by deploying the .NET Core app without passing `--self-contained true` parameter to the `dotnet publish` command.

## Conclusion

Installing the .NET Core runtime in the Service Fabric cluster turned out to be not so straight forward task as it seemed in the beginning. The main reason is the lack of documentation and examples on how to do it via Terraform templates. Thanks for reading!

### Resources

<https://docs.microsoft.com/en-us/dotnet/core/tools/dotnet-install-script#examples>

<https://www.terraform.io/docs/providers/azurerm/r/service_fabric_cluster.html>
