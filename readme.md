# visDash

This platform was created to increase visibility among all levels of goals for any organization or company; the goal is to visualize and keep track of progress on enterprise goals, outcomes, and quarterly increments. This is done all in the effort to facillitate accountability for all the organizational goals.


### How this works
Everything pushed to the master branch of this repository will be reflected on.... link


### How it's set up
 This was abandoned because there is a 10 second downtime everytime someone updated information (and pushed to the master repo). We deemed that severely mitigating the downtime during data updates as a top priority so it was only natural for this to go. I chose to leave this one on in case anyone in the future wanted to abandon NGINX. 

### Maintaining the Platform
Make sure the filename tag in the outcome xml files matches the actual names of the xml files, e.g. filename.xml must have filename.xml between its filename tag in the bottom. This is crucial for taking the user to the edit page. 


### Going forward -- ideas for improvements
- Migrating all the data from xml files to some database
- If ^ is done, creating a separate form page that enables easy editing of the data (prefilled key-value form)
- If ^ is done, creating a graph to keep track of and visualize progress. A graph is currently unimplemented because to have a graph, we must store past metrics, but we currently cannot do it easily.
- Use login name for pictures and names, rather than linking to the photos and having the names all hardcoded into the xml files
- Having an error page for when ejs crashes when the xml files inevitably become corrupted (emailing system?). Nothing has been done yet for error handling.
- The word 'room' is used interchangeably with 'value stream,' as 'room' and 'value stream' are merely different words for the identical concept. So fix all 'room' to 'value stream.' Should be an easy find and replace.


### Getting Started (to use locally and edit)

Clone or download this repo. Download and install npm. Then on a terminal commandline:
```
npm install
```

Then, again, into the terminal:
```
node server.js
```

Then open up your favorite browser and go to:
```
http://localhost:5000/
```