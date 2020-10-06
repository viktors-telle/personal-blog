---
title: How To Improve Your Code Readability
date: 2020-09-09T18:32:56.770Z
description: >-
  We spend more time reading others or our code than writing it. Here is the
  quote by Robert C. Martin a.k.a. Uncle Bob from his famous book Clean Code: A
  Handbook of Agile Software Craftsmanship:


  "Indeed, the ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code. ...[Therefore,] making it easy to read makes it easier to write."


  These are strong words and clearly indicate that we should pay much more attention to writing a well-readable code. I will share nine suggestions that will make your code much more appealing and easy to read.
keywords:
  - Code Readability
  - Clean Code
  - C#
  - .NET
---
We spend more time reading others or our code than writing it. Here is the quote by Robert C. Martin a.k.a. Uncle Bob from his famous book [Clean Code: A Handbook of Agile Software Craftsmanship](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882/ref=sr_1_1?crid=1T81N1JK49VW6&dchild=1&keywords=clean+code+a+handbook+of+agile+software+craftsmanship&qid=1600172289&sprefix=Clean+Code%3A+A+Handbook+of+Agile+Software+Craftsmanship%2Caps%2C247&sr=8-1):

> Indeed, the ratio of time spent reading versus writing is well over 10 to 1. We are constantly reading old code as part of the effort to write new code. ...\[Therefore,] making it easy to read makes it easier to write.

These are strong words and clearly indicate that we should pay much more attention to writing a well-readable code. I will share nine suggestions that will make your code much more appealing and easy to read.

## 1. Place each parameter on the separate line

Class constructor and method parameters should be placed on a separate line. This rule usually makes sense when you have more than two parameters.

Don't

```csharp
public class Person
{
  public Person(string name, string middleName, string lastName, int age)
  {
  }
}
```

Do

```csharp
public class Person
{
  public Person(string name, 
                string middleName, 
                string lastName, 
                int age
               )
  {
  }
}
```

Placing each parameter on a separate line improves the readability of the code. Each parameter stands out as well as you don't have to horizontally scroll to see them. This comes down to the next suggestion.

## 2. Create a separate class if the parameter count is more than three

Again, the quote by Uncle Bob:

> The ideal number of arguments for a function is zero (niladic). Next comes one (monadic), followed closely by two (dyadic). Three arguments (triadic) should be avoided where possible. More than three (polyadic) requires very special justification — and then shouldn’t be used anyway.

In my opinion, the three parameters are fine.

Don't

Do

## 3. Place public methods on the top of the class

Public methods of the class are the ones used by other classes, therefore should be located at the beginning of the class to avoid scrolling and navigating back and forth.

Don't

Do

## 4. Place the private methods in the calling order

It is much easier to navigate between private methods if they are placed in the order they are called by public methods. Many times I see that private methods are randomly placed inside the class. It makes navigating between the methods harder because you are constantly jumping up or down as you read the code.

Don't

Do

## 5. Do not use prefixes for the class fields

Prefixes do not add any value. They introduce unnecessary verbosity and therefore should be avoided.

Don't

Do

## 6. Split long lines of code into multiple lines

Try to avoid writing the lines of code that exceed 100 symbols. It makes code harder to read because you need to use horizontal scrolling.

Don't

Do

## 7. Create small classes focused on a single task

Comply with the Single Responsibility Principle (SRP). Create small classes usually means not exceeding 100 lines of code.

Don't

Do

## 8. Prefer to extract the code into separate files instead of using regions

Although regions can be a decent way to separate different code blocks in a single file, more often it is an indication that the file contains too much code and should be extracted into separate files.

Don't

Do

## 9. Choose appropriate names

Choose the names for the classes, properties, variables that are easy to understand and describe its intent. Don't be shy to use long names to better express your intention.

Don't

Do

## Conclusion

I know that many of these suggestions might sound obvious, but I often see the same mistakes made in the code that I review, therefore I decided to share them with you.

Many tools such as [FxCop](https://docs.microsoft.com/en-us/visualstudio/code-quality/install-fxcop-analyzers?view=vs-2019), [SonarLint](https://www.sonarlint.org/), or [ReSharper](https://www.jetbrains.com/resharper/) provide the functionality that will clean-up the code and provide the suggestions as you type. I have used them all, and I strongly recommend starting using these or similar tools to avoid simple mistakes, and also to save the time of other developers who are going to review your code.