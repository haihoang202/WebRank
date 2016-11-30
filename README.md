# WebRank
Using NodeJS to parse and get ranking of websites based on selected country
NodeJS 
Computer Science 450 - Programming Language 
 by Hoang Pham - hhp6148


Introduction
A. What is NodeJS?
NodeJS is developed by Ryan Dahl in 2009.
An open source, cross platform JavaScript built on Google V8 runtime engine for developing various web servers, networking tools and applications. 
A lot of application of big companies are developed in NodeJS such as: Dow Jones 100% server sides based, Uber, GoDaddy, PayPal, Netflix, Linkedln, …


B. NodeJS features?
Event-driven: node application is an event loop, when the server starts, it simply initiates its variables and declares functions. If there are event triggered (such as HTTP requests from users, ...) the application will process it and invokes the callback function when the request is completed, otherwise the application would go to sleep. 

→ Allow Node to run as one thread application but still able to serve a large request as a service.
Non I/O blocking model: NodeJS allows multitask running as the same time, whenever the task is completed, its callback function is called to returns the results. 

    → Reduce time processing and avoid bottle-neck at heavy processing task. Thus every function in NodeJS is desirably designed to have callback function. 


C. Why Node? 
Event-driven and non I/O blocking server make the application lightweight and efficient to run. 
NPM (NodeJS Package Manager) a library of more than 23.000 modules contributed.
The community is one of the most active group and supporting.
Fully documentation.




Project Demo:
A. WebRanking Crawler
 allow user to search for top 500 sites of based on geographical area (country). 


B. Development progress: 
At starting up, the application fetches for predefined countries in the world name and abbreviation.
When user submits a request, the application crawls Alexa.com to gather information such as Ranking, URL name, Description, Detail Links.
Return result, sorting result based on ranking ascending in form of table. 


C. Tech stack:
Express.js for server side logic
Typehead.js for typing suggestion
Alexa.com for source crawling
Cheerio.js for processing raw html
Jade Pug for html views
Bootstrap for styling.


D. Application of the language to project: 
Event-driven feature:



Non blocking I/O feature:



Conclusion
- NodeJS is great to learn about server side development.
- It is lightweight, efficient for processing large scale project.
- The community is active and growing.
- NPM has the most modules developed and ready to use.


Reference: 
https://www.tutorialspoint.com/nodejs/images/event_loop.jpg
https://en.wikipedia.org/wiki/Node.js
https://nodejs.org/en/docs/
https://blog.risingstack.com/how-enterprises-benefit-from-nodejs/
