---
title: My Questions To The Developers In The Job Interview
description:
 I will describe my own interviewing experience with developers. I will present the list of technical questions that I ask during the interview. I will also show the checklist of home task review criteria.
date: '2020-07-19T18:56:43.252Z'
keywords: ["Technical Interview", "Interview Tips", "Recruitment", "Software Development", "Hiring"]
slug: my-questions-to-the-developers-in-the-job-interview
canonical: https://medium.com/datadriveninvestor/my-questions-to-the-developers-in-the-job-interview-560a866b3bf0
---

![Photo by [Christina @ wocintechchat.com](https://unsplash.com/@wocintechchat?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](people-sitting-at-the-table-during-job-interview.jpg)

I will describe my own interviewing experience with developers. People who I interview, have different expertise levels. I have spoken with pure back-end and front-end developers and also full-stack developers. During the interview, I explain what is the team set-up and what technologies and methodologies we use. Also, I ask questions to understand the candidate’s level of experience. As I am a system architect, not an HR person, my questions are mostly technical ones.

## Questions I usually ask

Since the code quality is one of the key metrics in software development, I usually start with the question:

* How do you and your team ensure a good code quality level?

Then I proceed with the next questions:

* How does the code gets deployed to the production? Explain the journey of the code starting from the commit until it ends up in production.
* What are the ways you gain new knowledge in software development?
* What is the latest technology, programming language, or framework you have learned?
* Are you familiar with the SOLID principles? Can you explain a few of these principles from your own experience?
* Do you follow some other best practices when writing the code?
* How do you detect and troubleshoot production issues?
* What is the branching strategy that you use in the latest projects?
* Do you write unit tests daily? What are the benefits of unit tests?

If I see that person is familiar with unit testing, then I ask about the test coverage.

It’s fine not to have the answers to all of these questions. You can tell the level of seniority based on how questions are answered.

Look, I am not a fan of asking theoretical questions. I am not saying that you should not know the software development theory. I believe that my questions can better reflect the maturity and hand-on experience of the person. As you can see, none of the questions include the specifics of any programming language. It is not necessary to ask such questions since you can assess the technical knowledge differently.

## How to test technical knowledge

The best way to assess candidate technical skill levels is by giving them a coding task. I prefer the option to allow the candidate to complete the task at home. A person can then write the code without unnecessary stress and set the deadline by themself.

Once you have received the completed task, you can check:

* Readability. It is arguably the most important metric of the code. We spend more time reading other people’s code than writing our code. Names of variables, classes, properties, etc, should be understandable and describe their intent. Ideally, you should read the code like a book.
* Code structure. Is the code separated by folders? Are the unit tests structured according to the main project structure? Is the project structure logical? For example, you should not place DTOs (Data Transfer Object) under the Domain folder.
* Attention to the details. Has the candidate read the assignment carefully and implemented all the required features? Has he or she asked the questions if something was unclear? It is always better to ask the questions, rather than make assumptions and redo later if the assumptions turned out to be incorrect.
* Knowledge depth of the programming language. Is the candidate using the latest language features? Are the optimal data structures used in particular situations? Are language best practices followed?
* Quality of the unit tests. Are the names of the test clear? Can you understand the intent of the test? Is the test verifying only a single value or scenario? What is the test coverage? Is the test verifying both positive and negative scenarios?
* Compliance with [SOLID](https://en.wikipedia.org/wiki/SOLID) principles. This is extremely important. SOLID are fundamental principles in software development that make your applications well maintainable.
* The simplicity of the solution. Is the KISS (Keep it Simple, Stupid) principle followed? You don’t need to impress the reviewer by creating a complex solution with a lot of classes and abstractions to show off your knowledge.

> “Genius is making complex ideas simple, not making simple ideas complex.” — Albert Einstein.

After reviewing the home task, the detailed code review is always sent back to the candidate.

## What about soft skills

What are soft skills anyway? Soft skills are, but not limited to, communication, critical thinking, leadership, positive attitude, teamwork, work ethic. It is not enough to have only great technical skills. Ok, if you are developing your project without need talking to other people, then it is acceptable lacking soft skills. Yet, in real-life projects, you have to communicate with different people like fellow developers, testers, product owners, even business people sometimes. You have to have at least a basic set of soft skills. Here is what raises a red flag to me immediately.

* The person is arrogant.
  You can see that by watching how a candidate behaves. Sometimes a person thinks that he or she is already hired before having the interview and only has come to ask us the questions and decide if we meet the expectations. There are also situations when candidates do not understand why I am asking them about SOLID principles. They say something like this: “I know a lot of principles because I have 10+ years of experience in software development. Why are you asking me this? I am not answering this question.”. Years of experience alone do not necessarily correlate with the level of expertise. One more thing I encourage not to do is interrupting the interviewer all the time. Be humble and polite during the interview. Actions speak louder than words.
* An interviewee is not tolerant of criticism.
  How to determine the tolerance to the criticism? You can ask a simple question. Imagine you have created a new pull request. Your colleagues have reviewed it and left some comments with suggested improvements. How do you react to these comments?

The hiring process is most likely not continued with a particular candidate if one of these negative traits is observed.

## Final words

The aim of the questions I ask during the interview is to understand the maturity level of the candidate. Combine them with coding task and you should understand whether the candidate is the senior, middle, or junior developer.

What are your expectations of candidates? What questions do you ask? Your comments are the most welcome.

Thanks for taking the time to read my article!

### Resources

[**Best Soft Skills to List on a Resume**  
_Candidates with strong soft skills are in high demand for many different types of jobs. Soft skills are the…_www.thebalancecareers.com](https://www.thebalancecareers.com/list-of-soft-skills-2063770 "https://www.thebalancecareers.com/list-of-soft-skills-2063770")[](https://www.thebalancecareers.com/list-of-soft-skills-2063770)

[https://en.wikipedia.org/wiki/SOLID](https://en.wikipedia.org/wiki/SOLID)