export default {
    /* 
        --background-color: #ffffff;
        --button-color: #0078c2;
        --text-color: #ffffff;
        --red-button: rgb(207,39,41);
        --settings-links: #517B94
        --box-shadow: rgba(44, 62, 80, 1)
        --red-button-text: rgb(207,39,41);
    */
    setPalette(root, dark_mode) {
        if (!dark_mode) {
            // Default palette - main (general)
            root.style.setProperty('--main-text-color', '#1d2324');
            root.style.setProperty('--main-background-color', '#ffffff');

            // In this example, the widget is set to #000 and #fff, but this can be any color,
            // Check out some examples in Settings.vue and become friends with this website:
            // https://codepen.io/sosuke/pen/Pjoqqp
            root.style.setProperty('--widgets-color', 'brightness(0) invert(0)');
            root.style.setProperty('--clock-color', 'invert(20%) sepia(43%) saturate(454%) hue-rotate(168deg) brightness(93%) contrast(89%)');

            // Course cards
            root.style.setProperty('--course-card-background', '#ffffff');
            root.style.setProperty('--course-card-shadow', 'rgba(179, 179, 179, 0.644)');
            root.style.setProperty('--course-card-text', '#000000');
            root.style.setProperty('--course-number-background', 'rgba(0, 0, 0, 0.86)');
            root.style.setProperty('--course-number-text', '#C1EDFF');

            // Settings Palette
            root.style.setProperty('--settings-logout-button', 'rgb(207,39,41);');
            root.style.setProperty('--settings-logout-button-shadow', 'rgba(144, 62, 80, 0.8)');
            root.style.setProperty('--settings-small-div', 'rgba(0, 0, 0, 0.64)');
            root.style.setProperty('--settings-text', '#517B94');
            root.style.setProperty('--settings-switch-on', '#42f593');
            root.style.setProperty('--settings-switch-off', '#f55442');
            root.style.setProperty('--settings-switch-ball', 'white');

            // Buttons Palette
            root.style.setProperty('--button-primary-blue', '#0078c2');
            root.style.setProperty('--button-hover-blue', '#005183');
            root.style.setProperty('--button-blue-shadow', 'rgba(67, 65, 120, 0.844)');
            root.style.setProperty('--button-grey-shadow', 'rgba(109, 109, 109, 0.644)');

            // Nav bar Palette
            root.style.setProperty('--nav-bar-text', '#2C3E50');
            root.style.setProperty('--nav-bar-background', '#f7f7f7');
            root.style.setProperty('--nav-bar-selected-text', '#466D85');
            root.style.setProperty('--nav-bar-box-shadow', 'rgba(109, 109, 109, 0.744)');
            root.style.setProperty('--nav-bar-link-text', '#575757');
            root.style.setProperty('--nav-bar-hover-background', '#466D85');
            root.style.setProperty('--nav-bar-hover-text', 'white');
            root.style.setProperty('--nav-bar-hover-top-shadow', 'rgba(85, 85, 85, 0.644)');
            root.style.setProperty('--nav-bar-hover-bottom-shadow', 'rgba(179, 179, 179, 0.644)');  

            // Course and Lecture 'pills'
            root.style.setProperty('--red-pill', '#d13e34');
            root.style.setProperty('--red-pill-shadow', 'rgba(249, 82, 71, 0.3)');
            root.style.setProperty('--yellow-pill', '#b95726');
            root.style.setProperty('--yellow-pill-shadow', 'rgba(244, 159, 50, 0.4)');
            root.style.setProperty('--blue-pill', '#0078c2');
            root.style.setProperty('--blue-pill-shadow', 'rgba(79, 109, 234, 0.3)');
            root.style.setProperty('--green-pill', '#04852f');
            root.style.setProperty('--green-pill-shadow', 'rgba(78, 205, 76, 0.3)');
            root.style.setProperty('--upcoming-pill', '#0078c2');
            root.style.setProperty('--upcoming-pill-shadow', 'rgba(109, 109, 109, 0.644)');

            // Lecture pills con't - these live in LectureCard.vue
            root.style.setProperty('--lecture-live', '#04852F');
            root.style.setProperty('--lecture-live-closed', '#f29f33');
            root.style.setProperty('--lecture-playback', '#683eca');
            root.style.setProperty('--lecture-recent', '#858585');
            root.style.setProperty('--lecture-upcoming', '#0076a8');
            root.style.setProperty('--lecture-pill-shadow', 'rgba(109, 109, 109, 0.644)');
            root.style.setProperty('--lecture-info-background', 'white');
            root.style.setProperty('--lecture-course-number-text', '#097bac');
            root.style.setProperty('--lecture-course-name-text', '#466D85');
            root.style.setProperty('--lecture-name-text', '#2C3E50');
            root.style.setProperty('--lecture-closed-text', '#a7640d');

            // Lecture attendance (Sync, Async, Absent) 
            // The actual sections with the %'s use the same colors as green-pill, lecture-playback, red-pill
            root.style.setProperty('--lecture-attendance-button-text', '#636363');
            root.style.setProperty('--lecture-attendance-grey-pill', 'rgb(110, 110, 110)');
            root.style.setProperty('--lecture-attendance-grey-shadow', 'rgba(109, 109, 109, 0.644)');
            root.style.setProperty('--lecture-attendance-text', 'white');
            root.style.setProperty('--lecture-attendance-live-glow', 'rgba(65, 162, 91, 0.33)');
            root.style.setProperty('--lecture-attendance-async-glow', 'rgba(214, 71, 233, 0.36)');
            root.style.setProperty('--lecture-attendance-absent-glow', 'rgba(255, 99, 88, 0.36)');

            // In CourseInfo.vue there is a pill that gets calculated by attendance %, it uses these:
            // It also uses (--red-pill) (--yellow-pill) and (--green-pill) for the non-100% attendances
            root.style.setProperty('--course-attendance-rainbow-blue', 'rgba(62,73,202,1)');
            root.style.setProperty('--course-attendance-rainbow-purple', 'rgba(143,62,202,1)');
            root.style.setProperty('--course-attendance-rainbow-red', 'rgba(209,62,52,1)');
            root.style.setProperty('--course-attendance-rainbow-yellow', 'rgba(176,95,22,1)');
            root.style.setProperty('--course-attendance-rainbow-green', 'rgba(4,133,47,1)');

            
            // Legend green and purple
            root.style.setProperty('--sync-border', '#04852f');
            root.style.setProperty('--async-boder', '#683eca');

            root.style.setProperty('--button-color', '#0078c2');
            root.style.setProperty('--text-color', '#1d2324');
            root.style.setProperty('--dashboard-text-color', '#2C3E50');
            root.style.setProperty('--dashboard-background-color', '#F5F5F5');

          } else {

            // Dark mode palette - main (general)
            root.style.setProperty('--main-text-color', '#ffffff');
            root.style.setProperty('--main-background-color', '#1d2324');

            root.style.setProperty('--widgets-color', 'brightness(0) invert(1)');
            root.style.setProperty('--clock-color', 'invert(20%) sepia(43%) saturate(454%) hue-rotate(168deg) brightness(93%) contrast(89%)');
            
            // Course cards
            root.style.setProperty('--course-card-background', '#272727');
            root.style.setProperty('--course-card-shadow', 'rgba(179, 179, 179, 0.644)');
            root.style.setProperty('--course-card-text', '#ffffff');
            root.style.setProperty('--course-number-background', 'rgba(0, 0, 0, 0.86)');
            root.style.setProperty('--course-number-text', '#C1EDFF');

            // Dark mode palette - settings
            root.style.setProperty('--settings-logout-button', 'rgba(110, 148, 186, 1)');   
            root.style.setProperty('--settings-logout-button-shadow', 'rgba(69, 122, 176, 0.8)');
            root.style.setProperty('--settings-small-div', 'rgba(216, 216, 216, 0.64)');
            root.style.setProperty('--settings-text', '#cccccc');
            root.style.setProperty('--settings-switch-on', '#42f593');
            root.style.setProperty('--settings-switch-off', '#f55442');
            root.style.setProperty('--settings-switch-ball', 'white');

            // Buttons Palette - lives in venue.core.css
            root.style.setProperty('--button-primary-blue', '#082d45');
            root.style.setProperty('--button-hover-blue', '#06283d');
            root.style.setProperty('--button-blue-shadow', 'rgba(40, 39, 66, 0.844)');
            root.style.setProperty('--button-grey-shadow', 'rgba(109, 109, 109, 0.644)');

            // Dark mode Palette - Nav bar 
            root.style.setProperty('--nav-bar-text', '#5e2f2f');
            root.style.setProperty('--nav-bar-background', '#a16262');
            root.style.setProperty('--nav-bar-selected-text', '#a12725');
            root.style.setProperty('--nav-bar-box-shadow', 'rgba(89, 45, 45, 0.744)');
            root.style.setProperty('--nav-bar-link-text', '#c9abab');
            root.style.setProperty('--nav-bar-hover-background', '#6e3b3a');
            root.style.setProperty('--nav-bar-hover-text', '#eba8a7');
            root.style.setProperty('--nav-bar-hover-top-shadow', 'rgba(138, 54, 54, 0.644)');
            root.style.setProperty('--nav-bar-hover-bottom-shadow', 'rgba(219, 173, 173, 0.644)'); 

            // Legend green and purple
            root.style.setProperty('--sync-border', '#0ac448');
            root.style.setProperty('--async-boder', '#9576db');

            // Course and Lecture 'pills'
            root.style.setProperty('--red-pill', '#d13e34');
            root.style.setProperty('--red-pill-shadow', 'rgba(249, 82, 71, 0.3)');
            root.style.setProperty('--yellow-pill', '#b95726');
            root.style.setProperty('--yellow-pill-shadow', 'rgba(244, 159, 50, 0.4)');
            root.style.setProperty('--blue-pill', '#0078c2');
            root.style.setProperty('--blue-pill-shadow', 'rgba(79, 109, 234, 0.3)');
            root.style.setProperty('--green-pill', '#04852f');
            root.style.setProperty('--green-pill-shadow', 'rgba(78, 205, 76, 0.3)');
            root.style.setProperty('--upcoming-pill', '#0078c2');
            root.style.setProperty('--upcoming-pill-shadow', 'rgba(109, 109, 109, 0.644)');

            // Lecture pills con't - these live in LectureCard.vue
            root.style.setProperty('--lecture-live', '#04852F');
            root.style.setProperty('--lecture-live-closed', '#f29f33');
            root.style.setProperty('--lecture-playback', '#683eca');
            root.style.setProperty('--lecture-recent', '#858585');
            root.style.setProperty('--lecture-upcoming', '#0076a8');
            root.style.setProperty('--lecture-pill-shadow', 'rgba(109, 109, 109, 0.644)');
            root.style.setProperty('--lecture-info-background', 'white');
            root.style.setProperty('--lecture-course-number-text', '#097bac');
            root.style.setProperty('--lecture-course-name-text', '#466D85');
            root.style.setProperty('--lecture-name-text', '#2C3E50');
            root.style.setProperty('--lecture-closed-text', '#a7640d');

            // Dark mode palette - lecture attendance
            root.style.setProperty('--lecture-attendance-button-text', '#636363');
            root.style.setProperty('--lecture-attendance-grey-pill', 'rgb(110, 110, 110)');
            root.style.setProperty('--lecture-attendance-grey-shadow', 'rgba(109, 109, 109, 0.644)');
            root.style.setProperty('--lecture-attendance-text', 'white');
            root.style.setProperty('--lecture-attendance-live-glow', 'rgba(65, 162, 91, 0.33)');
            root.style.setProperty('--lecture-attendance-async-glow', 'rgba(214, 71, 233, 0.36)');
            root.style.setProperty('--lecture-attendance-absent-glow', 'rgba(255, 99, 88, 0.36)');

            // In CourseInfo.vue there is a pill that gets calculated by attendance %, it uses these:
            // It also uses (--red-pill) (--yellow-pill) and (--green-pill) for the non-100% attendances
            root.style.setProperty('--course-attendance-rainbow-blue', 'rgba(62,73,202,1)');
            root.style.setProperty('--course-attendance-rainbow-purple', 'rgba(143,62,202,1)');
            root.style.setProperty('--course-attendance-rainbow-red', 'rgba(209,62,52,1)');
            root.style.setProperty('--course-attendance-rainbow-yellow', 'rgba(176,95,22,1)');
            root.style.setProperty('--course-attendance-rainbow-green', 'rgba(4,133,47,1)');
    
            root.style.setProperty('--button-color', '#201857');
            root.style.setProperty('--text-color', '#ffffff'); 
            root.style.setProperty('--dashboard-text-color', '#87a7c7');
            root.style.setProperty('--dashboard-background-color', '#636363');
          }
    }
}

/**********************************************************************************
 **********************************************************************************
 **********************************************************************************
 ***                                                                            ***
 ***   VVVV    VVVV   EEEEEEE  NNNNN      NNNN     UUUU     UUUU      EEEEEEE   ***
 ***    VVV    VVV    EEEEEEE  NNNNNN     NNNN     UUUU     UUUU      EEEEEEE   ***
 ***     VV    VV     EEE      NNNNNNN    NNNN     UUUU     UUUU      EEE       ***
 ***      VVVVVV      EEEEE    NNNN  NNN  NNNN     UUUU     UUUU      EEEEE     ***
 ***       VVVV       EEE      NNNN   NNN NNNN      UUUU   UUUU       EEE       ***
 ***        VV        EEEEEEE  NNNN    NNNNNNN       UUUUUUUUU        EEEEEEE   ***
 ***                  EEEEEEE  NNNN       NNNN         UUUUU          EEEEEEE   ***
 ***                                                                            ***
 ***                                Color Palette:                              ***
 ***                                   Default                                  ***
 ***                                                                            ***
 ***                                  GENERAL                                   ***
 ***                                                                            ***
 ***                        Headings and courses: #87a7c7                       ***
 ***                                 NAVY BLUE                                  ***
 ***                            Text color: #000000                             ***
 ***                                   BLACK                                    ***
 ***                           Background: #ffffff                              ***
 ***                                   WHITE                                    ***
 ***                                                                            ***
 ***                                                                            ***
 ***                                 DASHBOARD                                  ***
 ***                          These values live in dashboard                    *** 
 ***                                                                            ***
 ***                    Box shadows: rgba(109, 109, 109, 0.644)                 ***
 ***                              TRANSPARENT GREY                              ***
 ***                              Recent: #999                                  ***
 ***                                   GREY                                     ***
 ***                              Upcoming: #0074d9                             ***
 ***                                   BLUE                                     ***
 ***                                                                            ***
 ***                               SECTIONS                                     ***
 ***                         Live in venue-core.css                             ***
 ***                                                                            ***
 ***                    Uses main body background and color                     ***
 ***                             for section cards                              ***
 ***                                                                            ***
 ***                         Course text and #: #C1EDFF                         ***
 ***                               LIGHT BLUE                                   ***
 ***                       Course box background: #272727                       ***
 ***                   Box this # lives in: rgba(0, 0, 0, 0.86)                 ***
 ***                            BLACK (transparent)                             ***
 ***                          Sync border: #04852f                              ***
 ***                                   GREEN                                    ***
 ***                           Async border: #683eca                            ***
 ***                                   PURPLE                                   ***
 ***                                                                            ***
 ***                                                                            ***
 ***                               RAINBOW                                      ***
 ***              Red: #d13e34, Transparent: rgba(249, 82, 71, 0.3)             ***
 ***            Orange: #b95726 Transparent: rgba(244, 159, 50, 0.4)            ***
 ***            Green: #04852f Transparent: rgba(78, 205, 76, 0.3)              ***
 ***             Blue: #0078c2 Transparent: rgba(79, 109, 234, 0.3)             ***
 ***                                                                            ***
 ***                                                                            ***
 ***                               LECTURES - main.css                          ***
 ***                      Contains the name, date and %                         ***
 ***                                                                            ***
 ***                     Box shadow: rgba(109, 109, 109, 0.644)                 ***
 ***                            TRANSPARENT GREY                                ***
 ***                 Synchronous: #04852f and rgba(65, 162, 91, 0.33)           ***
 ***                                GREEN                                       ***
 ***             Attendance medium: #b95726 and rgba(233, 126, 71, 0.36)        ***
 ***                                ORANGE                                      ***
 ***                 Attendance bad: #d13e34 and rgba(255, 99, 88, 0.36)        ***
 ***                                  RED                                       ***
 ***               Light grey will be used for unselected boxes                 ***
 ***               Custom Scollbar: #F5F5F5 and rgba(0, 0, 0, 0.1)              ***
 ***                           VERY LIGHT GREY                                  ***
 ***                                                                            ***
 ***                          LECTURE CARDS                                     ***
 ***               GREEN: Live lecture: #04852F                                 ***
 ***              ORANGE: Closed lecture: #f29f33                               ***
 ***              PURPLE: Playback lecture: #683eca                             ***
 ***             LIGHT GREY: Recent lecture: #858585                            ***
 ***               BLUE: Upcoming lecture: #0076a8                              ***
 ***              SHADOW: rgba(109, 109, 109, 0.644)                            ***
 ***                                                                            ***
 ***             Note that all lecture pills have the same                      ***
 ***              shadow, this can be changed by making an                      ***
 ***             rgba() for all the different colors                            ***
 ***                                                                            ***
 ***              OFF-BLUE: Course number, e.g. "RCOS 2961" #097bac             ***
 ***             GREY-BLUE: Course name: #466D85                                ***
 ***               NAVY: Lecture name: #2C3E50                                  ***
 ***             ORANGE: Closed text: #a7640d                                   ***
 ***            orange closed text is the only text color that                  ***
 ***            doesn't mirror the pill color                                   ***                         
 ***                                                                            ***
 ***                                                                            ***
 ***                               BUTTONS                                      ***
 ***                                                                            ***
 ***              BLUE Primary: #0078c2 rgba(109, 109, 109, 0.644)              ***
 ***            GREY  Secondary: #727272 rgba(109, 109, 109, 0.644)             ***
 ***            NAVY Button Hover: #005183 rgba(109, 109, 109, 0.644)           ***
 ***          DARK GREY Secondary Hover: #444444 rgba(109, 109, 109, 0.644)     ***
 ***                                                                            ***
 ***                                MODAL                                       ***
 ***                     NEAR WHITE Input: #f7f7f7                              ***
 ***              TRANSPARENT WHITE: rgba(255, 255, 255, 0.65)                  ***
 ***                            GRAY: Border                                    ***
 ***                        ^ May not be needed ^                               ***
 ***                                                                            ***
 ***                                                                            ***
 ***                               SETTINGS                                     ***
 ***                                                                            ***
 ***                  Logout Button: rgb(207,39,41)  (red)                      ***
 ***                Logout btn Shadow:  rgba(144, 62, 80, 1) (dark red)         ***
 ***            Switch unticked: #f55442 Ticked: #42f593 Circle: #ffffff        ***
 ***            Name and heading color: #517B94 (light-ish blue)                ***
 ***                                                                            ***
 ***                         DROPDOWN MENU LIVES IN                             ***
 ***                                NavBar.vue                                  ***
 ***                                                                            ***
 ***         (DARK NAVY/GREY) Text color: #2C3E50                               ***
 ***                  (LIGHT PINK) Background: #f7f7f7                          ***
 ***               (NAVY) Selected Text: #466D85                                ***
 ***           (Transparent GREY) List shadow: rgba(109, 109, 109, 0.644)       ***  
 ***                 ^ Shadow on the bottom box                                 ***
 ***            (DARK GREY) Text color on main bar: #575757                     ***
 ***                                                                            ***
 ***             (NAVY BLUE) Hover background: #466D85                          ***
 ***                (WHITE) Hover text: #ffffff                                 ***
 ***     (DARK GREY) Hover box top shadow:  rgba(85, 85, 85, 0.644)             ***
 ***  (LIGHT GREY) Hover box bottom shadow: rgba(179, 179, 179, 0.644)          ***
 ***                                                                            ***
 ***                                                                            ***
 ********************************************************************************** 
 **********************************************************************************
 **********************************************************************************          

 */