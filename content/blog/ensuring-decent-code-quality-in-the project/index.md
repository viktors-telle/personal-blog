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

Strive for 100% coverage and enforce the minimum allowed code coverage by using a static code analyzer.

## Static Code Analysis

Static code analysis is the way to ensure the code meets a certain quality bar.

What are the benefits of static code analysis?

First of all, it reduces the manual work for other developers during the code review. Secondly, it provides a safety net.

## Code Reviews

You can do the remote code reviews via Pull Requests. You can do the code review in two ways. By pressing the approve button without having a detailed look or you can do the thorough review. I have seen both approaches. It is clear that you should review the code thoroughly, otherwise it cannot be called code review at all.

If possible also try to do the reviews in person.

## Automated CI/CD pipeline

Use CI/CD tools like Azure DevOps, TeamCity, Jenkins, or others. Builds should run automatically for the main branch and also for other branches, e.g. feature branches. Display the build status in the Pull Request and restrict merge if build fails. You could also add the SonarQube pull request decoration and disallow to complete it if SonarQube quality gate fails.

## Automated tests

Automated tests should provide you with even more confidence that new functionality did not break the existing one.

If you are a .NET developer, then [SpecFlow](https://specflow.org/) is probably one of the best choices. SpecFlow is the #1 .NET open source framework for Behavior Driven Development, Acceptance Test Driven Development, and Specification by Example.

Resources:

https://specflow.org/

https://www.selenium.dev/