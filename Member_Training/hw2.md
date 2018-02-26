# Visualizing K-Means clustering

Now that you know a bit more of D3 syntax, you can do some work in visualizing a specfic algorithm important to data science: k-means clustering. 

In this homework you'll: 
1. Finish up the scatterplot from the meeting.
2. Learn how unsupervised learning works. 
3. Visualize how k-means works. 
4. Make the visualization your own.

If you weren't able to make it to the meeting today, please go create the scatterplot found [in the d3CrashCourse folder](d3CrashCourse) and take a look at the [slides](d3CrashCourse/DVcrashCourse.pdf).

## Finish up the scatterplot
At the meeting we got up to adding points and axes. The last thing you need to do for the base scatterplot is add a legend (see the demo files found [in the d3 tutorial folder](d3CrashCourse)). 

## Learn about unsupervised learning. 
Two major concepts in machine learning are supervised vs. unsupervised learning. Supervised learning involves a dataset where you have the features. For example, for the iris dataset you know the species of the iris and can train a model to predict the species given new irises. Unsupervised learning deals with unalabelled data. For example, you don't know the species of each iris flower and you're trying to group them together to try and discover the groups for yourself. 

Most machine learning deals with supervised learning. Unsupervised learning, however, is extremely helpful, however, in discoverring patterns in a dataset. Together with good data viz, unsupervised learning can help guide the actions of a ML project. 

Required reading: 
- [Machine Learning for Humans: Unsupervised Learning](https://medium.com/machine-learning-for-humans/unsupervised-learning-f45587588294). You should read part 3 (especially the part on kmeans) but this whole series is a great read. 
- [This article about K-means specifically](https://www.naftaliharris.com/blog/visualizing-k-means-clustering/). Feel free to take inspiration from this article when creating your own k-means viz. 

For the curious/ not required: 
- [Notes from last semester's training program](https://github.com/CornellDataScience/training-program-FA17/blob/master/notes/Lecture7.ipynb). If you want to play with implementing some of these algorithms in Python.
-  [MIT Courseware Notes](http://www.mit.edu/~9.54/fall14/slides/Class13.pdf). A little more technical/in depth but still cool. 

## Visualize k-means
Refering to the demo files in the d3CrashCourse folder, visualize k-means clustering working on the scatterplot. Make sure to set up a local server to actually see the visualization now that you're reading in data from a local file. 

## Make the viz your own. 
Congrats, you can now copy and paste code. You should now do something with the code to change it up. Make that two somethings. Some examples of what you might do to change it up: 
- Change the color scheme. Look into how you would change the color scale to match up species with different colors (instead of using d3.schemeCategory10)
- Automate the k-means clustering. The algorithm always converges on a certain cluster, so how would you animate that? 
- Add a mechanism to show the current accuracy of the clusters. Note that in unsupervised learning you wouldn't be able to do this (since you wouldn't hypothetically know the actual species label) but it's good practice. 

Make 2 changes to the visualization, then create another gist like you did for the homework. Keep in mind, these changes should not be trivial. 

## Brainstorm project ideas!
We'll be starting to discuss the project more concretely next week so start thinking about what you'd like to do. Some cool resources to get you in the mood: 
- [A Visual Introduction to Machine Learning](http://www.r2d3.us/visual-intro-to-machine-learning-part-1/)
- [Visualizing Algorithms](https://vimeo.com/112319901), by the creator of D3. The first roughly 15 minutes are especially relevant. 
- The whole website [Distill](https://distill.pub/)

