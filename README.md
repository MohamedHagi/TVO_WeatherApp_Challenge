# Weather App

Demo Link: https://tvo-weather.netlify.app/

The Weather App is a full-stack application that allows users to search for weather information and manage their profiles. The app includes user authentication, and profile management, and displays weather data based on user preferences.

## Technologies Used

### Frontend
- React.js
- Tailwind CSS
- Axios

### Backend
- Node.js
- Express.js
- MongoDB

## Usage

### Searching for Weather Information

**Guests:** Users who are not logged in can use the search bar to search for any city and retrieve the current weather information for that location. (The default is Toronto)

### User Registration and Preferences

**Signup:** After users sign up and provide their location preferences, the weather information displayed will be tailored to that location.

**Returning Users:** Users who revisit the site can log back in using their email. Upon logging in, they will see the weather information for their preferred location.

### Limitations

**Session Persistence:** This version of the application does not have the functionality to cache user login information, meaning users will need to log in each time they visit the site.

**Automatic Location Detection:** This version of the application does not support automatically detecting the user's location via their browser to display the weather information for their current location.


## Getting Started

### Prerequisites
- Node.js installed on your machine
- MongoDB instance (local or cloud-based)

### Installation

1. **Clone the repository:**
   
   ```bash
   git clone https://github.com/yourusername/weather-app.git
   cd weather-app
2. **Setup the backend:**
    ```bash
   cd backend
    npm install
3. **Configure the backend:**
   Add any relevant API keys
    ```bash
    RAPIDAPI_KEY="your_api_key"
    MONGODB_URI="your_mongodb_connection_string"
4. **Setup Frontend:**
   ```bash
   cd ../frontend
   npm install


That's it! You can now start using the application. Happy coding!

