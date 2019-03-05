A common problem is finding the most profitable trade in an array of numbers
representing closing prices of a stock over a period of time. 

This problem is challenging because if one sees a buy price that is relatively
low one doesn't know on a first pass of array if that buy price will have a good enough
sell price later.

I wanted to demonstrate the algorithm to approach this problem with 
a very simple web app that is just vanilla html/css/js.

User can add new days and new prices and be told what the most profitable trade is 
Importantly the days that are buy and sold become highlighted in the UI.

Note there might be multiple buy and sell days that result in same max profit.
This app defaults to earliest such trade assuming that one wants to get their profit
earlier rather than later.
