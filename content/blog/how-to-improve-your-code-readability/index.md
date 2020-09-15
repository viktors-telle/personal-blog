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
## Place each parameter on the separate line

Class constructor and method parameters should be placed on a separate line.

Don't

Do

## Place public methods on the top of the class

Public methods of the class are the ones used by other classes, therefore should be located at the beginning of the class to avoid scrolling and navigating back and forth.

Don't

Do

## Place the private methods in the calling order

It is much easier to navigate between private methods if they are placed in the order they are called by public methods.

Don't

Do

## Do not use prefixes for the class fields

Prefixes do not add any value. They introduce unnecessary verbosity and therefore should be avoided.

Don't

Do

## Create a separate class if the parameter count is more than three

Don't

Do

## Create small classes focused on a single task

Comply with the Single Responsibility Principle (SRP). Create small classes usually means not exceeding 100 lines of code.

Don't

Do

## Prefer to extract the code into separate classes instead of using regions

Don't

Do

## Choose appropriate names

Choose the names for the classes, properties, variables that are easy to understand. Don't be shy to use long names to better express your intention.

Don't

Do