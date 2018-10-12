"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * Copyright (c) Austin Turner
 * The software in this package is published under the terms of MIT
 * license, a copy of which has been included with this distribution in the
 * LICENSE.txt file.
 */
const SoqlParser_1 = require("./SoqlParser");
// const soqlString: string = `
// SELECT Id, Name, SUM(0) MySummation, SUM(),
//   (SELECT Id, FirstName, LastName FROM Contacts)
// FROM Account
// WHERE123
// (Name LIKE '%FOO%'
// AND CreatedDate > TODAY
// AND Id IN ('Id1', 'Id2')
// AND Foo IN (123, 123)
// AND LastModifiedDate > YESTERDAY)
// OR Id NOT IN ('x', 'y')`;
// // Create the lexer and parser
// let inputStream = new ANTLRInputStream(soqlString);
// let lexer = new SOQLLexer(inputStream);
// console.log('Lexing finished.');
// let tokenStream = new CommonTokenStream(lexer);
// console.log('Token stream finished.');
// let parser = new SOQLParser(tokenStream);
// console.log('Parser finished.');
// parser.removeErrorListeners();
// parser.addErrorListener(new SyntaxErrorListener());
// const soqlQueryContext: Soql_queryContext = parser.soql_query();
// const listener = new Listener();
const queries = [
    `SELECT Id FROM Account WHERE (Id IN ('1', '2', '3') OR (NOT Id = '2') OR (Name LIKE '%FOO%' OR (Name LIKE '%ARM%' AND FOO = 'bar')))`,
    `SELECT Id FROM Contact WHERE Name LIKE 'A%' AND MailingCity = 'California'`,
    `SELECT Name FROM Account ORDER BY Name DESC NULLS FIRST`,
    `SELECT Name FROM Account WHERE Industry = 'media' LIMIT 125`,
    `SELECT Name FROM Account WHERE Industry = 'media' ORDER BY BillingPostalCode ASC NULLS LAST LIMIT 125`,
    `SELECT COUNT() FROM Contact`,
    `SELECT LeadSource, COUNT(Name) FROM Lead GROUP BY LeadSource`,
    `SELECT Name, COUNT(Id) FROM Account GROUP BY Name HAVING COUNT(Id) > 1`,
    `SELECT Name, Id FROM Merchandise__c ORDER BY Name OFFSET 100`,
    `SELECT Name, Id FROM Merchandise__c ORDER BY Name LIMIT 20 OFFSET 100`,
    `SELECT Contact.FirstName, Contact.Account.Name FROM Contact`,
    `SELECT Id, Name, Account.Name FROM Contact WHERE Account.Industry = 'media'`,
    `SELECT Name, (SELECT LastName FROM Contacts) FROM Account`,
    `SELECT Account.Name, (SELECT Contact.LastName FROM Account.Contacts) FROM Account`,
    `SELECT Name, (SELECT LastName FROM Contacts WHERE CreatedBy.Alias = 'x') FROM Account WHERE Industry = 'media'`,
    `SELECT Id, FirstName__c, Mother_of_Child__r.FirstName__c FROM Daughter__c WHERE Mother_of_Child__r.LastName__c LIKE 'C%'`,
    `SELECT Name, (SELECT Name FROM Line_Items__r) FROM Merchandise__c WHERE Name LIKE 'Acme%'`,
    `SELECT Id, Owner.Name FROM Task WHERE Owner.FirstName like 'B%'`,
    `SELECT Id, Who.FirstName, Who.LastName FROM Task WHERE Owner.FirstName LIKE 'B%'`,
    `SELECT Id, What.Name FROM Event`,
    `SELECT TYPEOF What WHEN Account THEN Phone, NumberOfEmployees WHEN Opportunity THEN Amount, CloseDate ELSE Name, Email END FROM Event`,
    `SELECT Name, (SELECT CreatedBy.Name FROM Notes) FROM Account`,
    `SELECT Amount, Id, Name, (SELECT Quantity, ListPrice, PricebookEntry.UnitPrice, PricebookEntry.Name FROM OpportunityLineItems) FROM Opportunity`,
    `SELECT UserId, LoginTime from LoginHistory`,
    `SELECT UserId, COUNT(Id) from LoginHistory WHERE LoginTime > 2010-09-20T22:16:30.000Z AND LoginTime < 2010-09-21T22:16:30.000Z GROUP BY UserId`,
    `SELECT Id, Name, IsActive, SobjectType, DeveloperName, Description FROM RecordType`,
    `SELECT CampaignId, AVG(Amount) avg FROM Opportunity GROUP BY CampaignId HAVING COUNT(Id, Name) > 1`,
    `SELECT LeadSource, COUNT(Name) cnt FROM Lead GROUP BY ROLLUP(LeadSource)`,
    `SELECT Status, LeadSource, COUNT(Name) cnt FROM Lead GROUP BY ROLLUP(Status, LeadSource)`,
    `SELECT Type, BillingCountry, GROUPING(Type) grpType, GROUPING(BillingCountry) grpCty, COUNT(id) accts FROM Account GROUP BY CUBE(Type, BillingCountry) ORDER BY GROUPING(Type), GROUPING(Id, BillingCountry), Name DESC NULLS FIRST, Id ASC NULLS LAST`,
    `SELECT c.Name, c.Account.Name FROM Contact c`,
    `SELECT LeadSource, COUNT(Name) FROM Lead GROUP BY LeadSource HAVING COUNT(Name) > 100 and LeadSource > 'Phone'`,
];
const query = SoqlParser_1.parseQuery(queries[31], { logging: true });
console.log(JSON.stringify(query, null, 2));
// const output = [];
// queries.forEach((soql, i) => {
//   const query = parseQuery(soql, {});
//   output.push({ testCase: i + 1, soql, output: query });
// });
// console.log(JSON.stringify(output, null, 2));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYXBwL2luZGV4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7Ozs7O0dBS0c7QUFDSCw2Q0FBMEM7QUFFMUMsK0JBQStCO0FBQy9CLDhDQUE4QztBQUM5QyxtREFBbUQ7QUFDbkQsZUFBZTtBQUNmLFdBQVc7QUFDWCxxQkFBcUI7QUFDckIsMEJBQTBCO0FBQzFCLDJCQUEyQjtBQUMzQix3QkFBd0I7QUFDeEIsb0NBQW9DO0FBQ3BDLDRCQUE0QjtBQUM1QixpQ0FBaUM7QUFDakMsc0RBQXNEO0FBQ3RELDBDQUEwQztBQUMxQyxtQ0FBbUM7QUFDbkMsa0RBQWtEO0FBQ2xELHlDQUF5QztBQUN6Qyw0Q0FBNEM7QUFDNUMsbUNBQW1DO0FBQ25DLGlDQUFpQztBQUNqQyxzREFBc0Q7QUFFdEQsbUVBQW1FO0FBRW5FLG1DQUFtQztBQUNuQyxNQUFNLE9BQU8sR0FBRztJQUNkLHNJQUFzSTtJQUN0SSw0RUFBNEU7SUFDNUUseURBQXlEO0lBQ3pELDZEQUE2RDtJQUM3RCx1R0FBdUc7SUFDdkcsNkJBQTZCO0lBQzdCLDhEQUE4RDtJQUM5RCx3RUFBd0U7SUFDeEUsOERBQThEO0lBQzlELHVFQUF1RTtJQUN2RSw2REFBNkQ7SUFDN0QsNkVBQTZFO0lBQzdFLDJEQUEyRDtJQUMzRCxtRkFBbUY7SUFDbkYsZ0hBQWdIO0lBQ2hILDBIQUEwSDtJQUMxSCwyRkFBMkY7SUFDM0YsaUVBQWlFO0lBQ2pFLGtGQUFrRjtJQUNsRixpQ0FBaUM7SUFDakMsdUlBQXVJO0lBQ3ZJLDhEQUE4RDtJQUM5RCxpSkFBaUo7SUFDakosNENBQTRDO0lBQzVDLGdKQUFnSjtJQUNoSixvRkFBb0Y7SUFDcEYsb0dBQW9HO0lBQ3BHLDBFQUEwRTtJQUMxRSwwRkFBMEY7SUFDMUYsd1BBQXdQO0lBQ3hQLDhDQUE4QztJQUM5QyxnSEFBZ0g7Q0FDakgsQ0FBQztBQUVGLE1BQU0sS0FBSyxHQUFHLHVCQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7QUFDekQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUU1QyxxQkFBcUI7QUFDckIsaUNBQWlDO0FBQ2pDLHdDQUF3QztBQUN4QywyREFBMkQ7QUFDM0QsTUFBTTtBQUVOLGdEQUFnRCJ9