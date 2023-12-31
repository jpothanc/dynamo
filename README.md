# Dynamo

Dynamo is a web application that allows you to configure JSON endpoints and visualize the data in a grid format for easy reading and support.

## Features

- **Configurable JSON Endpoints:** Easily configure and manage multiple JSON endpoints within the application.
- **Grid View:** Visualize JSON data in a grid format, making it easy to read and analyze.
- **User-Friendly Interface:** Intuitive and user-friendly interface for seamless navigation and interaction.

## Getting Started

These instructions will help you set up and run Dynamo on your local machine.

### Prerequisites

- Node.js: Make sure you have Node.js installed. You can download it from [nodejs.org](https://nodejs.org/).

### Installation

1. Clone the repository:

  ```javascript
   git clone https://github.com/your-username/dynamo.git
   ```
2. Navigate to the project directory:
  ```javascript
  cd dynamo
  ```

3. Install dependencies:
  ```javascript
   npm install
```
### Configuration

1. Open the config.json file in the src directory.:
2. Add your JSON endpoints by updating the endpoints array:
```javascript
 {
    "name": "trading",
    "description": "Trading Catalogues",
    "active": true,
    "environments": [
      {
        "name": "development",
        "baseurl": "https://datastore.dev.net/api/v1/data/query?"
      },
      {
        "name": "uat",
        "baseurl": "https://datastore.uat.net/api/v1/data/query?"
      },
      {
        "name": "production",
        "baseurl": "https://datastore.prod.net/api/v1/data/query?"
      }
    ],

    "catalogueItems": [
      {
        "url": "catalogue=Trading&catalogueItem=Users",
        "name": "users",
        "color": "#2E7D32",
        "source": "result"
      },
      {
        "url": "catalogue=Trading&catalogueItem=Desks",
        "name": "desks",
        "color": "#EC407A",
        "source": "result"
      }
    ]
}
```
