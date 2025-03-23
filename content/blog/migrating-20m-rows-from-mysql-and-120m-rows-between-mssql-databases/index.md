---
title: "Real-World Experience: Successfully Migrating 20M Rows from MySQL and 120M Rows Between MSSQL Databases"
date: 2025-03-23T10:55:45.376Z
description: "A detailed guide sharing practical insights, challenges, and best practices from migrating large datasets—20 million rows from MySQL and 120 million rows between MSSQL databases—in live production environments."
keywords:
  - data migration
  - MySQL to MSSQL migration
  - MSSQL database migration
  - large-scale data migration
  - SqlBulkCopy
  - .NET data migration
slug: migrating-20m-rows-from-mysql-and-120m-rows-between-mssql-databases
---

![Photo by [Taylor Vick](https://unsplash.com/@tvick) on [Unsplash](https://unsplash.com/photos/cable-network-M5tzZtFCOfs)](data-migration.avif)

Migrating large datasets between production databases is a complex and demanding task—particularly when the target systems are actively serving users. Recently, I successfully undertook two large-scale database migration projects:

- Migrating approximately **20 million rows** from **MySQL** to **Microsoft SQL Server (MSSQL)**.
- Migrating around **120 million rows** between two **MSSQL** databases.

In this article, I detail the strategies, challenges, solutions, and best practices I learned through this significant undertaking.

## Setup & Planning

### Technology Stack and Tools

To effectively manage the data migration process, I developed two custom console applications using **.NET 8**. These applications provided full control over:

- Batch processing and data transformation.
- Logging and monitoring migration progress and errors.

The key technologies and tools included:

- **SqlBulkCopy** for efficient bulk inserts into MSSQL databases.
- **Polly**, a resilience library for automatic retries of transient errors.
- Intermediary staging tables within a dedicated `Migration` schema.

### Intermediary Migration Schema

To minimize production impact, I used intermediary staging tables within a dedicated migration schema. This allowed:

- Rapid bulk insertions via `SqlBulkCopy`.
- Isolation of migration workload from production tables.
- Easier management of data transformations and validations.

Selective indexing was applied on staging tables to enhance query performance during transformations. Production tables were minimally indexed to maintain optimal bulk insertion performance.

## Execution

### Batch Processing and Optimizations

Data migrations occurred incrementally in carefully sized batches. Selecting the ideal batch size was critical:

- **Too-small batches** resulted in increased transaction overhead.
- **Too-large batches** risked performance degradation on the production systems.

Through iterative experimentation, optimal batch sizes typically ranged between 2,000 and 5,000 rows per batch.

### Transaction-Based Consistency

Each batch insertion executed within an explicit database transaction. Wrapping batches in transactions ensured that any errors triggered an immediate rollback, preserving data integrity.

### Efficient Bulk Inserts with SqlBulkCopy

Migration steps followed a consistent process in the .NET console apps:

1. **Fetch data** from the source database (MySQL using `MySql.Data` NuGet package, MSSQL using `System.Data.SqlClient` NuGet package).
2. **Transform** data within the migration tool.
3. **Bulk insert** the transformed batch into the staging table using `SqlBulkCopy`.
4. **Run dedicated SQL scripts** to transform, validate, and move data from staging tables into final production tables.

### Example: Using SqlBulkCopy in .NET

```csharp
using var bulkCopy = new SqlBulkCopy(connection, SqlBulkCopyOptions.Default, transaction)
{
    DestinationTableName = "Migration.Users",
    BatchSize = 5000,
    BulkCopyTimeout = 600 // seconds
};

await bulkCopy.WriteToServerAsync(dataTable);
```

## Challenges & Solutions

### Performance Bottlenecks (Batch Sizes)

Optimizing batch sizes was a critical challenge. Small batches caused excessive overhead due to frequent commits, while large batches negatively affected live databases. Through careful testing, batches of around 2,000–5,000 rows were found optimal.

### Minimizing Impact on Live Systems

Since the migrations involved active production databases, the following practices reduced load impact:

- Scheduling migrations during off-peak hours.
- Using intermediary migration tables to isolate heavy bulk insert activities.
- Continuous monitoring and adjustments based on database metrics (CPU, disk I/O, log space usage).

### Ensuring Data Consistency with a Delta Migration

Post-migration consistency was crucial. After completing the primary migration, I performed a separate **delta migration**, executing the migration tool again to capture records created or updated during the initial migration period.  

The migration tool itself did not run continuously for delta synchronization. Instead, after completing the initial migration, **bi-directional data synchronization** was activated between the old and the new systems.

## Logging, Monitoring, and Error Handling

Detailed logging and monitoring were essential to successful migrations. The custom .NET migration applications implemented comprehensive logging:

- Batch number and timestamps
- Row count per batch
- Execution durations and detailed error logs

### Example: Logging and Polly-based Retry

```csharp
var loggerFactory = LoggerFactory.Create(builder =>
{
    builder.AddConsole();
});

var logger = loggerFactory.CreateLogger("MigrationLogger");

var retryPolicy = Policy.Handle<SqlException>()
    .WaitAndRetryAsync(3, retryAttempt => 
        TimeSpan.FromSeconds(Math.Pow(2, retryAttempt)),
        (exception, timeSpan, retryCount, context) =>
        {
            logger.LogWarning(exception: exception, 
                "Retry {RetryAttempt} after {Delay} due to {Message}",
                retryAttempt, timeSpan, exception.Message);
        });

await retryPolicy.ExecuteAsync(async () =>
{
    using var bulkCopy = new SqlBulkCopy(connection, transaction);
    await bulkCopy.WriteToServerAsync(dataTable);
});
```

## Best Practices & Lessons Learned

- **Carefully test batch sizes** for performance optimization.
- **Use intermediary staging tables** to improve speed and reduce risk.
- **Consistent transactions** ensure data integrity and facilitate error management.
- **Implement robust logging and monitoring** for rapid issue detection.
- **Perform delta migrations explicitly**, separate from ongoing synchronization.

## Conclusion

Successfully migrating tens or hundreds of millions of rows requires careful planning, efficient execution, and robust monitoring. By adopting effective batching, staging tables, clear transaction management, and extensive logging, large-scale migrations can be performed reliably and with minimal disruption to live systems.

By sharing these experiences, I hope to help developers and technology leaders confidently execute large-scale migrations.
