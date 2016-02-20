# lifelongTourists

This app is meant as a blogging platform for travelers to recount their experiences. It is a refactor of one of my pre-existing MeanJS app, which, for the time being, explains some of the seemingly unrelated code in some of the controllers. I am refactoring this app's modules and controllers to be as lean and reusable in as many contexts as possible so that they can easily be dropped into any future project with - ideally - no needed tweeking. This includes client- and server-side controllers where the CRUD operations are entirely encoded in the arguments passed in by the client, and can be used by very general purpose GETs, POSTs, etc. with the use of naming conventions.

To that extent, this project is simultaneously a useful app creation and an all-purpose tool building exercise that will streamline future projects with the creation plug-and-play modules. The current state of the app betrays a few mistakes like the pollution of  $rootScope with the storage of several global vars and a few blatant violations of DRY priciples left over from debugging sessions. This will soon be corrected with a code clean-up and the introduction of proper Angular services.

A short description of the usage flow:
- A prospective user creates an account
- When ready, the user adds a trip (as example, we will suppose a trip to Greece and Turkey)
  - first step: a brief description of the trip including a title (say, 'Mediterranean Escape!'), departure / return dates, and a recap 
  - second step: adding a trip leg; in this case, the first leg of the trip is Greece. The user can add a text description and photos
  - third step (optional): adding any additional legs. In this case, Turkey would be the second leg of the trip.
  - fourth step: adding fellow travelers. Anyone that accompanied the user on this trip can be added as you would add a friend to an event post on FaceBook. If the fellow traveler does not have an account, the posting user can enter the fellow's email to prompt them to register with the service and be recognized as a fellow traveler. In this manner, a Trip database entry stores several traveler IDs that can be referenced.

Additional features are that a region of the world can be searched and every travel post to that region - whether a full trip or merely a leg of a trip - can be viewed by anyone curious about that part of the world. More feature add-ons will be documented as the app progresses, and the generic client- and server-side modules will also be stored in their own respective repos once sufficiently developed.
