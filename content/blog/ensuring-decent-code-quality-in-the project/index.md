---
title: Ways to ensure decent code quality in the project
date: 2020-08-04T03:23:14.484Z
description: Code quality is the most important goal that you should pursue in
  your project. If neglected, it can cause a devastating effect in the long run.
  Your project becomes hard to maintain. Costs increase and the motivation of
  developers to work with such a project declines.
keywords:
  - Unit Tests
  - Code Reviews
  - Static Code Analysis
  - Quality Software
  - .NET
---
Code quality is the most important goal that you should pursue in your project. If neglected, it can cause a devastating effect in the long run. Your project becomes hard to maintain. Costs increase and the motivation of developers to work with such a project declines. In this article, I am going to describe the ways how you can ensure better code quality in your codebase.

## Unit Tests

The main benefit of writing unit tests is the confidence that your application will not break when making changes to its codebase. Strive for 100% coverage, and enforce the minimum allowed code coverage by using a [static code analyzer](https://en.wikipedia.org/wiki/List_of_tools_for_static_code_analysis). If unit coverage is not sufficient, then do not allow completing the pull request. Developers are lazy and sometimes applying strict rules is the only way to ensure that unit tests are written.

If somebody says that writing unit tests is the waste of time, then run from that person as fast as you can. Never compromise on the quality because it can backfire on you later.

If you are a front-end developer, you can you [Jest](https://jestjs.io/), which is a JavaScript unit testing framework. I have tried it in Angular and React projects, and it works really well.

For projects based on .NET, you can use either [nUnit](https://nunit.org/) or [xUnit](https://xunit.net/). Both of them are great, but I personally prefer xUnit.

## Static Code Analysis

Static code analysis is the way to ensure the code meets a certain quality bar. Many tools on the market provide this functionality. I have personally used [SonarQube](https://www.sonarqube.org/), and I very much like it. It has a Community edition, which you can use for free in both personal and commercial projects. The main drawback of the community edition inability to analyze multiple git branches at the same time. Consider purchasing the Developer edition if you need per branch analysis. I have used Developer edition and so far it works great. Beware of one thing if you are planning to purchase Developer edition. SonarQube sales team is responding slowly, and it took me almost 2 months to get the license from them.

What are the benefits of static code analysis?

* First of all, it reduces the manual work for other developers during the code review.
* Secondly, it provides a safety net. A static code analyzer will highlight the potential issues in your code before these issues get to production.
* Also, it helps you to manage the technical debt. You can analyze older projects, and see how much technical debt is at hand.

I recommend using [SonarLint IDE](https://www.sonarlint.org/) plugin to catch potential issues before they are detected by SonarQube during the continuous integration (CI) process. You will see the issues as you type. You can use it in your favorite IDE such as Eclipse, IntelliJ IDEA, Visual Studio, VS Code.

## Code Reviews

You can do the code review in two ways. One way is to press the approve button without having a detailed look. Another way is a thorough review. I have seen both approaches. You should review the code thoroughly, otherwise, it cannot be called code review at all.

You can do code reviews remotely or in person. Both approaches are good, but in-person code reviews have a slight edge because you can immediately provide the feedback and explain the findings in more detail. Also, you can bond with the person better.

Everyone in the team should participate in the code reviews. It does not matter if you are a junior or senior developer. Junior developers can suprise you sometimes.

## Automated CI/CD Pipeline

Use CI/CD tools like [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/), [TeamCity](https://www.jetbrains.com/teamcity/), [Jenkins](https://www.jenkins.io/), or others. Builds should run automatically for the main branch and also for other branches, e.g. feature branches. Display the build status in the pull request and restrict the merge to the main branch if the build fails. You could also add the SonarQube pull request decoration and disallow to complete it if SonarQube quality gate fails.

Cloud platforms such as Netlify provide the provisioning of the new environment for each pull request branch.

## Automated Tests

Use CI/CD tools like [Azure DevOps](https://azure.microsoft.com/en-us/services/devops/), [TeamCity](https://www.jetbrains.com/teamcity/), [Jenkins](https://www.jenkins.io/), or others. Builds should run automatically for the main branch and also for other branches, e.g. feature branches. Display the build status in the pull request and restrict the merge to the main branch if the build fails. You could also add the SonarQube pull request decoration and disallow to complete it if SonarQube quality gate fails. Cloud platforms such as Netlify provide the provisioning of the new environment for each pull request branch.

## Conclusion

Apply these techniques, and I am sure that your project overall code quality will increase.

How do you ensure the code quality in your projects?

Thanks for taking the time to read my article!

### Resources:

https://specflow.org/

https://www.selenium.dev/

https://www.sonarqube.org/

https://en.wikipedia.org/wiki/List_of_tools_for_static_code_analysis

https://jestjs.io/

https://nunit.org/

https://xunit.net/