---
title: Ensuring decent code quality in the project
date: 2020-08-03T03:23:14.484Z
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
Code quality is the most important goal that you should pursue in your project. If neglected, it can cause a devastating effect in the long run. Your project becomes hard to maintain. Costs increase and the motivation of developers to work with such a project declines. In this article, I am going to show the ways how you can ensure better code quality in your codebase.

## Unit tests

The main benefit of writing unit tests is the confidence that your application will not break when making changes to its codebase.

It does not matter, whether you choose xUnit, nUnit, or any other library. Strive for 100% coverage and enforce the minimum allowed code coverage by using a static code analyzer.

## Static Code Analysis

Static code analysis is the way to ensure the code meets the certain quality bar.

What are the benefits of static code analysis?

First of all, it reduces the manual work for other developers during the code review.

## Code Reviews

You can do the remote code reviews via Pull Requests. You can do the code review in two ways. Just to tick the checkbox (pressing Approve without even having a look) or you can do the thorough review. I have seen both approaches. It is clear that you should do thorough, otherwise it cannot be called code review at all.

If possible also try to do the reviews in person.

## Automated CI/CD pipeline

Use CI/CD tools like Azure DevOps, TeamCity, Jenkins, or others.

## Automated tests

Selenium.