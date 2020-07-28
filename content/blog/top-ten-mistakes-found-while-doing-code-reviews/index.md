---
title: Top ten mistakes found while performing code reviews
description:
  Code review is an excellent way to ensure a better quality of your codebase. I will describe the top ten common mistakes that developers make and how to solve them.
date: '2020-03-25T12:43:45.180Z'
keywords: ["Code Review", "Dotnet", "Csharp", "Clean Code", "Code Quality"]
slug: top-ten-mistakes-found-while-doing-code
canonical: https://medium.com/swlh/top-ten-mistakes-found-while-doing-code-reviews-b935ef44e797
---

![[https://www.osnews.com/story/19266/wtfsm/](https://www.osnews.com/story/19266/wtfsm/)](wtf-per-minute-code-quality.jpeg)

Code review is an excellent way to have four or more eye principle for the written code. It improves the overall code quality in the project, of course, if you do it thoroughly. In the day-to-day work, we use Azure DevOps Git repositories and perform code reviews daily via pull requests. Below are the ten most common faults that I have encountered while doing code reviews in no particular order.

### 1\. Naming

Naming is one of the most complicated elements while building the software. I struggle with it too! Ideally, you should choose to name your classes and properties so that your code can be read as a book. Try to choose the name of the method, class, property or variable as expressive as possible.

For variable name instead of using `var timeElapsed = 0;` try `var timeElapsedInSeconds = 0;`. Why another developer should guess what unit of measurement you chose for this particular variable? You can include it in the name so that the intent is clear. In the previous example, you could also use `TimeSpan` struct instead of `int` as it offers more flexibility. You could then change the name of the variable to `timeElapsedSinceStart`.

The name of the method should include a verb to represent the action that it does.

```c#
public decimal CalculatePrice() { ... }  
public User GetUser(int id) { ... }
```

Instead of using some technical name for the class, try choosing the name to represent its business logic.

```c#
public class SalaryCalculator { ... }  
public class User { ... }
```

### 2\. String comparison

Quite often I notice that developers do not pay much attention to the case sensitivity or culture settings when comparing string values. However, this is important and neglecting it might lead to potential bugs.

Usually, I see a similar comparison to this `if (name == "John")`. Sometimes it might be what we want, but in many cases, you need to ignore whether the name was typed in uppercase or lowercase, for example, when implementing search by person name. You could change the previous comparison to the following.

```c#
if (name.Equals("John", StringComparison.CurrentCultureIgnoreCase))
```

It will allow searching for “JOHN”, “john” or any other combination of lowercase and uppercase letters by respecting the culture-specific language rules.

If you wanted to check the file extension the better choice would be to use `OrdinalIgnoreCase` comparison type because it performs a simple byte comparison that is independent of language.

### 3\. Deep nesting

Have you ever seen a similar code to this?

```c#
if (something)  
{  
    if (somethingElse)  
    {  
        ...  
    }  
}
```

Most of us probably have. Such an approach makes it harder to read the code. One way to solve this issue is to invert `if` statement.

```c#
if (!something)  
{  
    return;  
}

if (!somethingElse)  
{  
    return;  
}
...
```

Just by inverting `if` statement and returning out of the method as soon as possible you eliminated the nesting and made the code more transparent.

Another option would be to combine the conditions in a single `if` statement.

```c#
if (!something && !somethingElse)  
{  
    return;  
}
```

You can further improve this piece of code by extracting both conditions to a separate method. Consider this example.

```c#
if (account.Status != AccountStatus.Suspended  
    && account.Status != AccountStatus.Terminated)  
{  
    ...  
}
```

And this improved version.

```c#
if (AccountIsActive())  
{  
    ...  
}

private bool AccountIsActive()  
{  
    return account.Status != AccountStatus.Suspended  
        && account.Status != AccountStatus.Terminated  
}
```

Having a separate method to check if the account is active made your code more readable.

### 4\. Single responsibility principle violation

My favorite Single responsibility principle (SRP) definition is by [Uncle Bob](https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html):

> The Single Responsibility Principle (SRP) states that each software module should have one and only one reason to change.

> Gather together the things that change for the same reasons. Separate those things that change for different reasons.

These statements can also be found in his outstanding book Clean Architecture.

From time to time I stumble upon the class/method that simply has too many responsibilities. Keep your methods short and make sure they do only one particular task. Extract extra logic to a separate method or class. Also, make sure that this exact method should really be placed in a particular class.

### 5\. Redundant null checks

In my opinion, you should avoid null checks as much as possible because they pollute the code and make it less elegant. I am advocating that you should not check for null values. After all, in reference type languages like C#, null checks are quite common to guard against infamous `NullReferenceException`.

Let’s examine the following example.

```c#
private readonly IUserStorage userStorage;

public IList<User> GetUsers()  
{  
    return userStorage.GetUsers() ?? new List<User>();  
}
```

It would more convenient for the method `GetUsers()` consumer if this method returns an empty list when users were not found in the database, rather than the null value.

Try to initialize class collection properties with an empty collection instead of hoping that consumers of the class will not forget to do it.

```c#
public class User  
{  
    public User()  
    {  
        Roles = new List<Role>();  
    }

    public IList<Role> Roles { get; set; }  
}
```

### 6\. Redundant comments

Do not write comments for the self-explanatory code. Overusing comments can make your code harder to read. I have seen the code where people write comments for almost every line of code. Why not use better naming instead?

I accept only comments that explain the workaround of a known issue and provide the link to GitHub or some other place where this issue was raised.

### 7\. Overusing async

You either go all the way async or sync. Don’t mix the sync and async code. It can lead to deadlocks. Please refer to this [article](https://blog.stephencleary.com/2012/07/dont-block-on-async-code.html) if you want to find more about how blocking async code can cause deadlocks. Take a look at the example below.

```c#{5-8}
public class UserController  
{  
    private readonly IUserStorage userStorage;  

    public async Task<IActionResult GetUser(int id)  
    {  
        return userStorage.GetUser(id).Result;  
    }

    public async Task<IActionResult GetUser(int id)  
    {  
        return await userStorage.GetUser(id);  
    }  
}
```

The highlighted approach should not be used because it will block the context thread that can potentially cause the deadlock. If your storage does not support asynchronous calls, then it is better to rewrite the code to the synchronous version similar to the example below.

```c#
public class UserController  
{  
    private readonly IUserStorage userStorage;  

    public IActionResult GetUser(int id)  
    {  
        return userStorage.GetUser(id);  
    }  
}
```

### 8\. Passing too many parameters

It is considered good practice when a method has few parameters. When it doesn’t, it can potentially violate SRP. One of the options on how to reduce the number of parameters is extracting them to separate class and passing it instead of many parameters. Another option is to revise the necessity of each parameter and possibly split the method into multiple methods. Here is another great quote by Uncle Bob from his book Clean Code:

> The ideal number of arguments for a function is zero (niladic). Next comes one (monadic), followed closely by two (dyadic). Three arguments (triadic) should be avoided where possible. More than three (polyadic) requires very special justification — and then shouldn’t be used anyway.

### 9\. Lack of unit tests

You should cover your code with tests. Period. Make sure that code is covered by unit tests or use tools that will check that automatically. We use [SonarQube](https://www.sonarqube.org/) or [ReSharper](https://www.jetbrains.com/resharper/) test runner to check whether code is coverage is at the optimal level.

### 10\. Magic strings

You should avoid using magic strings in the code. Sometimes the magic string repeats in multiple places and therefore violates DRY (Do not repeat yourself) principle. The easiest fix is to extract the string value to constant. Another option is to use the configuration file or database if this value can change due to some specific reasons like the deployment environment.
