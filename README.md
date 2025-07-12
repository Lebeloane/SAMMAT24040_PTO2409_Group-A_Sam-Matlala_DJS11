# 🎵 SamCast App | Portfolio Piece 💿


## Introduction
Welcome to my Podcast App project, SamCast. This application provides a responsive and simple platform for users to explore, listen to, and manage their favorite podcasts. Built with modern web technologies, the app aims to enhance the user experience by offering easy navigation and access to a diverse range of podcast content.

## Technology 🤖
  * Frontend: React
  * Styling: Tailwind CSS
  * Documentation: JSDoc for code documentation


## Features
The SamCast app includes several key features that enhance functionality and user experience:

## Navigation
   * Navbar: A responsive navigation bar located at the top of the application, featuring:
     * A logo on the left side.
     * Icon links for navigating to Home, Podcasts, and Favorites.


## Home Page
    * Podcast Browsing: Users can browse podcasts by clicking the browse button.
      * The homepage consists of button that routes the user to podcast Page.
      * Theres a Spinning Earth animation borrowed from uiverse to add style to the home page.


## Podcast Page
    * Podcast Listings: Displays a list of podcasts with:
      * Title, description, genre type, and the date it was last updated.
      * A sorting and filtering  button that allows users to sort podcasts by date (new/old), alphabetical order, or reverse alphabetical order.
      * Filtering podcasts to specific genres
      * Each podcast is clickable to view more details on the Podcast Details route.



## Podcast Details Route
    * Detailed View: Displays detailed information about the selected podcast, including:
      * Podcast title and description.
      * Buttons for each season that route to the Season Details page.


## Season Details Route
    * Season Overview: Displays:
      * The selected podcast title and season title.
      * An image representing the season.
      * A list of episodes, each with:
        * Episode title and description.
        * A play button to listen to the episode.
        * A heart button to add the episode to favorites.


## Favorites Route
    * User Favorites: A dedicated page that lists all podcasts the user has added to their favorites, featuring:
      * Persistent storage of favorites using localStorage.
      * A button to remove podcasts from favorites, which also updates localStorage.
      * Sorting options to arrange favorites by date (new/old) or alphabetical order.



## Footer
    * Information and Links: The footer includes:
      * Copyright information and a brief description about the app.
      * Links to my GitHub and LinkedIn profiles.
      * Contact email for inquiries or feedback.


## PageNotFound
    * Error Handling: A custom 404 page that displays a friendly error message and a link to a route that will redirect the user to the homepage


# Website link
## [SamCast App](https://grand-piroshki-cb5b30.netlify.app/)
