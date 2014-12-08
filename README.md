#Long Now Chalk: Mandala Time

an experiment with Juerg Lehni's awesome Paper.js library. I met Juerg at the Long Now Foundation working on his chalkboard robot (which takes JSON input from paper) last week and was inspired.

Mandala Time is a clock. Each circle or polygon is a minute in the day. Each ring of circles is an hour starting at midnight in the center and stepping out hour by hour.  

The current date is fed as a random seed into chance.js, then the Mandala Clock uses the pseudorandom output to set the parameters of the minute-shapes in each ring - creating a large number of possible configurations, 5.4 x 10^34 possible configurations at last calculation - many more than the number of stars in the observable universe, so I feel pretty safe saying the Mandala will be unique every day in the next 10,000 years (or the next 10 billion for that matter). 