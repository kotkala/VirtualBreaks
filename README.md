Sure, here is the updated and detailed README for your Virtual Breaks application:

---

# Virtual Breaks

Virtual Breaks is an open-source application designed to provide beautiful countdown screens for various breaks in virtual trainings and workshops. It allows users to manage different types of breaks, set durations, change icons, and select time zones. The application also includes features like background music and QR code generation for mobile timer pages.

## Table of Contents
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
  - [Home Page](#home-page)
  - [Settings Page](#settings-page)
  - [Summary Page](#summary-page)
- [Contributing](#contributing)
- [License](#license)

## Features
- Manage different types of breaks (Coffee Break, Lunch Break, Lab Time, etc.)
- Set durations and target times for breaks
- Change icons for each break type
- Select multiple time zones
- Generate QR codes for mobile timer pages
- Background music player during breaks

## Installation
To run Virtual Breaks locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone http://git.fa.edu.vn/qn24_cpl_java_05/team_01/virtualbreak.git
   cd virtualbreak/project/SPA
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`.

## Usage

### Home Page
The Home Page provides a brief overview of the application and a button to get started.

![Home Page](path/to/homepage-screenshot.png)

#### Navigation
1. Click the "Get Started" button to navigate to the Settings page.

### Settings Page
The Settings Page allows users to configure different types of breaks, set durations, target times, change icons, and select time zones.

![Settings Page](path/to/settings-screenshot.png)

#### Managing Breaks
1. **Select a Break**: Click on a break card to select it.
2. **Edit Name**: Click on the break name to edit it.
3. **Set Duration**: For breaks like Coffee Break and Lunch Break, click on the duration to edit it.
4. **Set Target Time**: For Lab Time, use the time picker to set the target time.
5. **Change Icon**: Click on the icon to upload a new one.
6. **Select Time Zones**: Use the multi-select dropdown to choose time zones.

#### Start a Break
1. Click the "Start Break" button to initiate the break.
2. If there are any issues (e.g., invalid time zones or durations), a warning message will be displayed.

### Summary Page
The Summary Page displays a countdown timer, QR code for mobile access, and the time the break will end in different time zones.

![Summary Page](path/to/summary-screenshot.png)

#### Countdown Timer
1. The countdown timer shows the remaining time until the break ends.
2. Background music can be played using the built-in music player.

#### QR Code
1. Scan the QR code with your smartphone to access a mobile timer page.

#### Time Zones
1. The page shows when the break will end in the selected time zones.

#### Back to Settings
1. Click the "Back to Settings" button at the top left to return to the Settings page without losing your configurations.

## Contributing
Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Description of feature or fix"
   ```
4. Push to your branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

## License
This project is licensed under the MIT License by Kim Long Tram Kieu Oanh Thi Phan.

---
t specifics, such as adding actual paths to the screenshots and any additional instructions or sections that might be necessary.
