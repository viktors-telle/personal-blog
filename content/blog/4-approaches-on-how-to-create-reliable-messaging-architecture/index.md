---
title: 4 approaches on how to create reliable messaging architecture
description:
  In this article, I am going to describe how to implement error handling using the RabbitMQ and MassTransit library in messaging architecture. It will make your data handling pipeline more resilient and reliable.
date: '2020-06-14T19:02:51.588Z'
keywords: ["Microservices", "Messaging", "Net Core", "RabbitMQ", "MassTransit"]
slug: 4-approaches-on-how-to-create-reliable-messaging-architecture
canonical: https://medium.com/datadriveninvestor/4-approaches-on-how-to-create-reliable-messaging-architecture-4aefcfc13cfd
---

![Photo by [Kate Macate](https://unsplash.com/@katemacate?utm_source=medium&utm_medium=referral) on [Unsplash](https://unsplash.com?utm_source=medium&utm_medium=referral)](two-envelopes.jpg)

Microservice architecture is trendy these days. Quite often it comes together with asynchronous data handling via messaging infrastructure. By asynchronous handling, I mean the data processing functionality executed in the background. Our company is not an exception in that sense, and we are using messaging quite a lot in our applications. It allows the handling of time-consuming tasks in the background. Users don’t have to wait until something has finished processing. The application also becomes more responsive to users.

Have you ever thought of the way how to handle messages that tolerates various errors? And also needs less manual work to handle these errors? Let me introduce you to the message retries, idempotency, and outbox in the messaging pipeline.

In this article, I am going to describe how to implement error handling using the [RabbitMQ](https://www.rabbitmq.com/) and [MassTransit](https://masstransit-project.com/) library. It will make your data handling pipeline more resilient and reliable.

Here are some prerequisites before you can successfully run the sample code used in this article:

* Install RabbitMQ on [Windows](https://www.rabbitmq.com/install-windows.html) or [Linux](https://www.rabbitmq.com/install-debian.html).
* Install [.NET Core 3.1 SDK](https://dotnet.microsoft.com/download/dotnet-core/3.1)
* Install [MongoDB](https://www.mongodb.com/try/download/community)

Also, this article assumes you have knowledge of C# and basic knowledge of RabbitMQ, MassTransit, and MongoDB.

### First-level retries

Imagine, one of the services you are integrated with becomes unavailable for a couple of minutes. You will most likely get service unavailable exception while the call is made to that particular service. Probably that should not cause immediate failure to the message handling because the message will be moved to the error queue, and who wants to handle potentially huge amounts of messages manually, right? First-level retries are life saviors in these types of situations.

They mostly should be used to handle transient exceptions such as database deadlocks, brief connections unavailability, and other types of situations when the duration of the issue is short, and application can quickly recover.

Here is the code example of how first-level retries can be configured.

```c#
using System;
using System.Threading.Tasks;
using GreenPipes;
using MassTransit;

namespace Retries
{
    internal static class Program
    {
        static async Task Main(string[] args)
        {
            var busControl = CreateBusControl();
            await StartBusControl(busControl);
        }

        private static IBusControl CreateBusControl()
        {
            return Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                cfg.Host("localhost");

                cfg.ReceiveEndpoint("message-queue", e =>
                {
                    e.UseMessageRetry(retryConfigurator =>
                        {
                            retryConfigurator.Incremental(
                                3,
                                TimeSpan.FromSeconds(1),
                                TimeSpan.FromSeconds(15)
                            );
                        }
                    );

                    e.Consumer<Consumer>();
                });
            });
        }

        private static async Task StartBusControl(IBusControl busControl)
        {
            await busControl.StartAsync();

            await busControl.Publish<IMessage>(
                new Message(Guid.NewGuid().ToString(), "Valid name")
            );

            Console.WriteLine("Press any key to exit");
            await Task.Run(() => Console.ReadKey());

            await busControl.StopAsync();
        }
    }
}
```

I have created a simple .NET Core console application to show the configuration needed to enable retries and added a plain message handler to test the retry logic. Notice that message is retried for the three times when you run the application.

You can read more about first-level retries in the [MassTransit documentation](https://masstransit-project.com/usage/exceptions.html#retry).

### Second-level (redelivery) retries

These retries are particularly useful when you have integrations with other systems, and those systems can potentially be unavailable due to various reasons for a longer period. Your application should be tolerant against such situations and not immediately send the message to the error queue. Error queue is the last resort in the message handling pipeline.

```c#
using System;
using System.Threading.Tasks;
using GreenPipes;
using MassTransit;

namespace Retries
{
    internal static class Program
    {
        static async Task Main(string[] args)
        {
            var busControl = CreateBusControl();
            await StartBusControl(busControl);
        }

        private static IBusControl CreateBusControl()
        {
            return Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                cfg.Host("localhost");
                // Enable redelivery.
                cfg.UseDelayedExchangeMessageScheduler();

                cfg.ReceiveEndpoint("message-queue", e =>
                {
                    // Configure redelivery retries.
                    e.UseScheduledRedelivery(retryConfigurator =>
                        {
                            retryConfigurator.Intervals(
                                TimeSpan.FromMinutes(1),
                                TimeSpan.FromMinutes(2),
                                TimeSpan.FromMinutes(3)
                            );
                        }
                    );

                    e.UseMessageRetry(retryConfigurator =>
                        {
                            retryConfigurator.Incremental(
                                3,
                                TimeSpan.FromSeconds(1),
                                TimeSpan.FromSeconds(15)
                            );
                        }
                    );

                    e.Consumer<Consumer>();
                });
            });
        }

        private static async Task StartBusControl(IBusControl busControl)
        {
            await busControl.StartAsync();

            await busControl.Publish<IMessage>(
                new Message(Guid.NewGuid().ToString(), "Valid name")
            );

            Console.WriteLine("Press any key to exit");
            await Task.Run(() => Console.ReadKey());

            await busControl.StopAsync();
        }
    }
}
```

I have slightly adjusted the previous example by adding a configuration that enables message redelivery.

I have chosen to use the [RabbitMQ Delayed Message Plugin](https://github.com/rabbitmq/rabbitmq-delayed-message-exchange/) because it is a lightweight alternative to Quartz, which does not require any storage outside of RabbitMQ.

You need to complete several steps for redelivery to work. To make this work with RabbitMQ, you also need to install the `rabbitmq_delayed_message_exchange` plugin by following the [plugin installation guide](https://www.rabbitmq.com/installing-plugins.html). After the plugin has been installed, run `rabbitmq-plugins enable rabbitmq_delayed_message_exchange` command in the RabbitMQ sbin command line to enable it.

After enabling it and launching the application, a new exchange is created (see the image below) to store the messages that need to be retried after a configured period and will guarantee that messages are not lost upon the RabbitMQ node restart.

![Message Queue Delay Exchange](message-queue-delay-exchange.png)

You can read more about the redelivery in [MassTransit documentation](https://masstransit-project.com/usage/exceptions.html#redelivery). When you run the updated application, you will notice that first-level retries are executed in the beginning, and only then redelivery kicks in for the messages that were not handled successfully during first-level retries. In this example, messages will eventually appear in the error queue because the exception is thrown all the time. Redelivery will not help in this case.

#### Do not retry certain exceptions

You might have situations when specific types of exceptions should be ignored during the execution of either the first or the second-level retries. For example, the message should not be retried if it fails some specific validation. Fortunately, MassTransit provides such functionality, and it is called [Exception filters](https://masstransit-project.com/usage/exceptions.html#exception-filters). You can either ignore certain exceptions or retry only specific ones.

```c#
using System;
using System.Threading.Tasks;
using GreenPipes;
using MassTransit;

namespace Retries
{
    internal static class Program
    {
        static async Task Main(string[] args)
        {
            var busControl = CreateBusControl();
            await StartBusControl(busControl);
        }

        private static IBusControl CreateBusControl()
        {
            return Bus.Factory.CreateUsingRabbitMq(cfg =>
            {
                cfg.Host("localhost");
                // Enable redelivery.
                cfg.UseDelayedExchangeMessageScheduler();

                cfg.ReceiveEndpoint("message-queue", e =>
                {
                    // Configure redelivery retries.
                    e.UseScheduledRedelivery(retryConfigurator =>
                        {
                            // Do not retry "NameTooShortException" exception.
                            retryConfigurator.Ignore(typeof(NameTooShortException));

                            retryConfigurator.Intervals(
                                TimeSpan.FromMinutes(1),
                                TimeSpan.FromMinutes(2),
                                TimeSpan.FromMinutes(3)
                            );
                        }
                    );

                    e.UseMessageRetry(retryConfigurator =>
                        {
                            // Do not retry "NameTooShortException" exception.
                            retryConfigurator.Ignore(typeof(NameTooShortException));

                            retryConfigurator.Incremental(
                                3,
                                TimeSpan.FromSeconds(1),
                                TimeSpan.FromSeconds(15)
                            );
                        }
                    );

                    e.Consumer<Consumer>();
                });
            });
        }

        private static async Task StartBusControl(IBusControl busControl)
        {
            await busControl.StartAsync();

            await busControl.Publish<IMessage>(
                new Message(Guid.NewGuid().ToString(), "Valid name")
            );

            await busControl.Publish<IMessage>(
                new Message(Guid.NewGuid().ToString(), "Short")
            );

            Console.WriteLine("Press any key to exit");
            await Task.Run(() => Console.ReadKey());

            await busControl.StopAsync();
        }
    }
}
```

I have added this line of code in two places compared to the previous example.

`retryConfigurator.Ignore(typeof(NameTooShortException));`

This tells us to ignore retrying `NameTooShortException` for both first and second-level retries.

### Message idempotency

Here is the definition of idempotence from [Wikipedia](https://en.wikipedia.org/wiki/Idempotence):

> **Idempotence** ([UK](https://en.wikipedia.org/wiki/British_English "British English"): [/ˌɪdɛmˈpoʊtəns/](https://en.wikipedia.org/wiki/Help:IPA/English "Help:IPA/English"),[\[1\]](https://en.wikipedia.org/wiki/Idempotence#cite_note-1) [US](https://en.wikipedia.org/wiki/American_English "American English"): [/ˌaɪdəm-/](https://en.wikipedia.org/wiki/Help:IPA/English "Help:IPA/English"))[\[2\]](https://en.wikipedia.org/wiki/Idempotence#cite_note-2) is the property of certain [operations](https://en.wikipedia.org/wiki/Operation_%28mathematics%29 "Operation (mathematics)") in [mathematics](https://en.wikipedia.org/wiki/Mathematics "Mathematics") and [computer science](https://en.wikipedia.org/wiki/Computer_science "Computer science") whereby they can be applied multiple times without changing the result beyond the initial application.

How this applies to the messaging, you might ask. In the messaging architecture, the idempotency means making sure that it is possible to process the same message infinite times, and the result will always be identical. It means no duplicate database records, no emails, or other types of notifications sent many times. This approach has the following benefits:

* Excludes the need for transactions. They can be quite tricky in the messaging infrastructure. Usually, message handlers call other services, and it is quite difficult to manage transactions across many systems.
* Enables the use of retries without concerns that something might fail when the consumer processes the message the second time.

How to start using it? To avoid duplicate record creation in the database, you need to add a check. It will verify the existence of the record before adding a new record. If the record already exists, you should return the existing one or skip creating a new one. It depends on the concrete use case.

To avoid duplicate notification sending, e.g., email or SMS, you need to save the previous sending fact somewhere. The most obvious choice is the database. Then add a logic that will verify if the same type of notification was already sent.

Apply this pattern in all places on the consumer side, and you will be able to handle the same message infinite times.

### Message outbox

Another way to improve the reliability of messaging is to use the message outbox on the producer (publisher) side. Message outbox is a great approach to deal with situations when you lose connection to the RabbitMQ. You want to send the message to the consumer anyway without failing the user action.

One way to implement this is by adding some persistent storage to save the serialized message. The type of persistent storage does not matter. It can depend on the database technology used in your company, or it may also be the database where you have the most knowledge. You also need to create a timer-based background job that will later resend these failed messages. It will guarantee that messages are not lost. Of course, the database can be unavailable too. In that case, one option is to show the error message in the GUI that something went wrong, and the user should contact the support.

Let me show you the two possible ways how to create an outbox.

MassTransit provides [in-memory message outbox](https://masstransit-project.com/2020/02/08/in-memory-outbox/). You can watch a great [video](https://www.youtube.com/watch?v=P41IsVAc1nI) from Chris Patterson, where he shows the outbox in practice with sagas. You can check his source code on [GitHub](https://github.com/phatboyg/Trashlantis).

I am going to show another way how to implement a message outbox. In my case, the message outbox resides on the producer side, and it can handle the situations when RabbitMQ is down.

I have used the following technologies:

* [RabbitMQ](https://www.rabbitmq.com/)
* [MassTransit](https://masstransit-project.com/) library
* [.NET Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)
* [MongoDB](https://www.mongodb.com/)

I have created the .NET Core console application and used the [Worker Service](https://docs.microsoft.com/en-us/aspnet/core/fundamentals/host/hosted-services?view=aspnetcore-3.1&tabs=visual-studio#worker-service-template) template to host three types of services:

* Message publisher service
* Message outbox processing service
* Consumer service

Message publisher service handles saving the messages in the MongoDB if the publishing fails.

```c#
using MassTransit;
using MessageOutbox.Outbox;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace MessageOutbox.Publisher
{
    public class MessagePublisherService : IHostedService
    {
        private const int PublishedMessageCount = 16;
        private readonly IBusControl bus;
        private readonly IMessageOutboxRepository messageOutboxRepository;
        private readonly ILogger<MessagePublisherService> logger;

        public MessagePublisherService(
            IBusControl bus,
            IMessageOutboxRepository messageOutboxRepository,
            ILogger<MessagePublisherService> logger
            )
        {
            this.bus = bus;
            this.messageOutboxRepository = messageOutboxRepository;
            this.logger = logger;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            for (var publishedMessage = 0; publishedMessage < PublishedMessageCount; publishedMessage++)
            {
                var message = new Message(Guid.NewGuid().ToString());
                try
                {
                     await bus.Publish(message);
                }
                catch (Exception)
                {
                    await messageOutboxRepository.Save(message);
                    logger.LogWarning($"Message with ID {message.Id} publishing failed, " +
                        $"and it was saved in database for later processing.");
                }
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
```

Message outbox processing service collects all unprocessed messages from MongoDB and tries to publish them.

```c#
using MassTransit;
using Microsoft.Extensions.Logging;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace MessageOutbox.Outbox
{
    internal interface IMessageOutboxProcessor
    {
        Task ProcessFailedMessages();
    }

    internal class MessageOutboxProcessor : IMessageOutboxProcessor
    {
        private readonly IMessageOutboxRepository messageOutboxRepository;
        private readonly IBusControl bus;
        private readonly ILogger<MessageOutboxProcessor> logger;

        public MessageOutboxProcessor(
            IMessageOutboxRepository messageOutboxRepository,
            IBusControl bus,
            ILogger<MessageOutboxProcessor> logger
            )
        {
            this.messageOutboxRepository = messageOutboxRepository;
            this.bus = bus;
            this.logger = logger;
        }

        public async Task ProcessFailedMessages()
        {
            await messageOutboxRepository.ExecuteTransaction(async () =>
            {
                var unprocessedMessages = await messageOutboxRepository.GetUnprocessed();

                var unprocessedMessageTasks = unprocessedMessages
                    .Select(unprocessedMessage => ProcessFailedMessage(unprocessedMessage));

                await Task.WhenAll(unprocessedMessageTasks);
            });
        }

            private async Task ProcessFailedMessage(IMessage message)
            {
                logger.LogInformation($"Processing message with ID {message.Id}.");

                try
                {
                    await bus.Publish(message);
                    await messageOutboxRepository.Update(message, true);
                }
                catch (Exception ex)
                {
                    await messageOutboxRepository.Update(message, false);
                    logger.LogWarning($"Message processing with ID {message.Id} failed. " +
                        $"{Environment.NewLine} Exception: {ex}");
                }

                logger.LogInformation($"Finished processing message with ID {message.Id}.");
            }
    }
}
```

Notice that I have used MongoDB transaction while message processing is happening. In case of failure, the message status is set back to unprocessed. Another reason for using transaction is to ensure that records in the database are locked during the transaction. Here is the example of the method, which initiates the transaction. The complete code of the class is available on [GitHub](https://github.com/viktors-telle/mass-transit-examples/blob/master/src/MessageOutbox/Outbox/MessageOutboxRepository.cs).

```c#
public async Task ExecuteTransaction(Func<Task> action)
{
    using var session = await client.StartSessionAsync();
    session.StartTransaction();
    try
    {
        await action();
        await session.CommitTransactionAsync();
    }
    catch (Exception)
    {
        await session.AbortTransactionAsync();
    }
}
```

If the previous step runs fine, consumer service will receive these messages.

```c#
using MassTransit;
using MessageOutbox.Outbox;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace MessageOutbox.Consumer
{
    public class MessageConsumer : IConsumer<IMessage>
    {
        private readonly ILogger<MessageConsumer> logger;

        public MessageConsumer(ILogger<MessageConsumer> logger)
        {
            this.logger = logger;
        }

        public Task Consume(ConsumeContext<IMessage> context)
        {
            logger.LogInformation($"Message with ID \"{context.Message.Id}\" consumed.");
            return Task.CompletedTask;
        }
    }
}
```

### Conclusions

The approaches described here are battle-tested in the production environment and work quite well. Message redelivery, idempotency, and outbox reduced the manual work for the support engineers and made our services more stable and resilient against various errors.

You can look at the complete example on [GitHub](https://github.com/viktors-telle/mass-transit-examples).
