---
title: How To Improve Your Code Readability
date: 2020-09-09T18:32:56.770Z
description: todo
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

Class constructor and method parameters should be placed on a separate line.

Don't

Do

## Place public methods on the top of the class

Public methods of the class are the ones used by other classes, therefore should be located at the beginning of the class to avoid scrolling and navigating back and forth.

Don't

Do

## 2. Place the private methods in the calling order

It is much easier to navigate between private methods if they are placed in the order they are called by public methods.

Don't

Do

## 3. Do not use prefixes for the class fields

Prefixes do not add any value. They introduce unnecessary verbosity and therefore should be avoided.

Don't

Do

## 4. Create a separate class if the parameter count is more than three

Don't

Do

## 5. Split long lines of code into multiple lines

Don't

Do

## 6. Create small classes focused on a single task

Comply with the Single Responsibility Principle (SRP). Create small classes usually means not exceeding 100 lines of code.

Don't

Do

## 7. Prefer to extract the code into separate files instead of using regions

Although regions can be a decent way to separate different code blocks in the single file, more often it is an indication that the file contains too much code and should be extracted into separate files.

Don't

Do

## 8. Choose appropriate names

Choose the names for the classes, properties, variables that are easy to understand and describe its intent. Don't be shy to use long names to better express your intention.

Don't

Do

## Conclusion

I know that many of these suggestions might sound obvious, but I often see the same mistakes made in the code that I review, therefore I decided to share them with you.