/* Useful resources for testing / changing palette
http://web-accessibility.carnegiemuseums.org/design/color/ (508 compliance guidelines)
https://wave.webaim.org/ (tests accessibility of website; also a helpful Google Chrome extension)
https://imagecolorpicker.com/en/ (Select colors from pictures - provides HEX and RGB code of selected color)
https://coolors.co/ (Color palette generator)

*/

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

            // Halloween palette - main (general) 
            // Only says Dark mode in notes because I originally wrote it in dark mode and 
            // copied it 🎃
            root.style.setProperty('--main-text-color', '#FFAC5E');
            root.style.setProperty('--main-background-color', '#1d2324');
            root.style.setProperty('--input-background', '#272727');
            root.style.setProperty('--input-border', '#FC7B03');
            root.style.setProperty('--input-text', '#FC7B03');
            root.style.setProperty('--input-shadow', 'rgba(252, 123, 3, 0.83)');

            // Errors 
            root.style.setProperty('--error', '#EE6060'); 
            root.style.setProperty('--error-brighter', '#FF4E4E');

            // Links - venue.css
            root.style.setProperty('--link', '#5597EE');
            root.style.setProperty('--link-hover', '#488BE3');

            root.style.setProperty('--widgets-color', 'brightness(0) invert(1)');
            root.style.setProperty('--clock-color', '');
            root.style.setProperty('--logo-color', '');
            root.style.setProperty('--red-x', 'brightness(0.75) saturate(0.75)');

            root.style.setProperty('--loader-square-even', '#e39144');
            root.style.setProperty('--loader-square-odd', '#bcf593');
            root.style.setProperty('--loader-square-shadow', 'rgba(128, 128, 128, 0.5)');
            
            
            // Course cards
            root.style.setProperty('--course-card-background', '#FFAC5E');
            root.style.setProperty('--course-card-shadow', 'rgba(79, 171, 13, 0.4)');
            root.style.setProperty('--course-card-text', '#141313');
            root.style.setProperty('--course-number-background', 'rgba(0, 0, 0, 0.86)');
            root.style.setProperty('--course-number-text', '#C1EDFF');

            // Dark mode palette - settings
            root.style.setProperty('--settings-logout-button', 'rgba(110, 148, 186, 1)');   
            root.style.setProperty('--settings-logout-button-shadow', 'rgba(69, 122, 176, 0.8)');
            root.style.setProperty('--settings-small-div', 'rgba(216, 216, 216, 0.64)');
            root.style.setProperty('--settings-logout-hover-text', '#272727');
            root.style.setProperty('--settings-text', '#cccccc');
            root.style.setProperty('--settings-switch-on', '#42f593');
            root.style.setProperty('--settings-switch-off', '#f55442');
            root.style.setProperty('--settings-switch-ball', 'white');

            // ChangePassword.vue
            root.style.setProperty('--change-password-error', '#FC6F71');
            root.style.setProperty('--change-password-success', '#34c759');
            root.style.setProperty('--change-password-success-border', '#158f34');

            // Buttons Palette - lives in venue.core.css
            // .btn-btn-danger has a separate instance of hover & friends in MultiSelectDropdown.vue 
            //  to prevent unfit shadows on the X buttons 
            root.style.setProperty('--button-primary-blue', '#DB6803');
            root.style.setProperty('--button-hover-blue', '#C1702C');
            root.style.setProperty('--button-secondary-grey', '#44A914');
            root.style.setProperty('--button-hover-grey', '#898E4B');
            root.style.setProperty('--button-danger', '#EB5C52');
            root.style.setProperty('--button-danger-shadow', 'rgba(110, 26, 34, 0.74)');
            root.style.setProperty('--button-danger-hover', 'rgba(240, 82, 94, 0.74)');
            root.style.setProperty('--button-tab', '#0078c2');
            root.style.setProperty('--button-tab-text', 'grey');
            root.style.setProperty('--big-button', '#B879E9');
            root.style.setProperty('--big-button-text', 'rgba(59, 36, 66, 1)');
            root.style.setProperty('--big-button-border', 'rgba(135, 24, 219, 0.5)');
            root.style.setProperty('--big-button-shadow', 'rgba(178, 110, 230, 0.444)');
            root.style.setProperty('--button-blue-shadow', 'rgba(22, 92, 8, 0.844)');
            root.style.setProperty('--button-grey-shadow', 'rgba(43, 117, 28, 0.644)');
            root.style.setProperty('--button-text-color', '#1E1212');
            root.style.setProperty('--button-text-hover', '#2B1E1E');

            // Dark mode Palette - Nav bar 
            root.style.setProperty('--nav-bar-text', '#e39144');
            root.style.setProperty('--nav-bar-background', '#3A0E66');
            root.style.setProperty('--nav-bar-separator', 'rgba(247, 162, 109, 0.15)');
            root.style.setProperty('--nav-bar-selected-text', '#EB7B13');
            root.style.setProperty('--nav-bar-box-shadow', 'rgba(183, 127, 240, 0.744)');
            root.style.setProperty('--nav-bar-link-text', '#bcf593');
            root.style.setProperty('--nav-bar-hover-background', '#e39144');
            root.style.setProperty('--nav-bar-hover-text', '#3A0E66');
            root.style.setProperty('--nav-bar-hover-top-shadow', 'rgba(255, 128, 74, 0.644)');
            root.style.setProperty('--nav-bar-hover-bottom-shadow', 'rgba(146, 98, 209, 0.644)'); 

            // Legend green and purple + sections dropdown border
            root.style.setProperty('--sync-border', '#0ac448');
            root.style.setProperty('--async-border', '#9576db');
            root.style.setProperty('--recording-namecard', '#8f3eca');

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
            root.style.setProperty('--foreground-pill', '#f5f5f5');
            root.style.setProperty('--foreground-pill-text', '#000000');
            root.style.setProperty('--foreground-pill-shadow', 'rgba(109, 109, 109, 0.644)');
            root.style.setProperty('--foreground-pill-hover', 'rgba(54, 54, 54, 0.644)');
            root.style.setProperty('--date-and-percent', 'white');
            root.style.setProperty('--course-pill-shadow', 'rgba(109, 109, 109, 0.644)');
            root.style.setProperty('--course-pill-hover', 'rgba(160, 160, 160, 0.644)');

            // Lecture pills con't - these live in LectureCard.vue
            root.style.setProperty('--lecture-live', '#09ed55');
            root.style.setProperty('--lecture-live-closed', '#f09218');
            root.style.setProperty('--lecture-playback', '#a388e3');
            root.style.setProperty('--lecture-recent', '#858585');
            root.style.setProperty('--lecture-upcoming', '#aa58e0');
            root.style.setProperty('--lecture-pill-shadow', 'rgba(75, 117, 45, 0.644)');
            root.style.setProperty('--lecture-info-background', '#b3f584');
            root.style.setProperty('--lecture-course-number-text', '#9433CE'); 
            root.style.setProperty('--lecture-course-name-text', '#26184A');
            root.style.setProperty('--lecture-name-text', '#3a2470');
            root.style.setProperty('--lecture-closed-text', '#B83902');

            // Dark mode palette - lecture attendance
            root.style.setProperty('--lecture-attendance-button-text', '#636363');
            root.style.setProperty('--lecture-attendance-grey-pill', 'rgb(110, 110, 110)');
            root.style.setProperty('--lecture-attendance-grey-shadow', 'rgba(109, 109, 109, 0.8)');
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

            // Lives in dashboardSection.vue -> also main heading color
            root.style.setProperty('--dashboard-text-color', '#A884BE');
            root.style.setProperty('--dashboard-background-color', '#636363');

            // Modal
            root.style.setProperty('--modal-background', '#272727');
            root.style.setProperty('--modal-course-name', '#53788E');
            root.style.setProperty('--modal-course-number', '#2398C8');
            root.style.setProperty('--modal-border', 'grey');
            root.style.setProperty('--modal-container-background', 'rgba(63, 63, 63, 0.65)');
            root.style.setProperty('--modal-lecture-border', 'rgba(120,120,120,1)');

            root.style.setProperty('--poll-background', 'lightskyblue');

            // Cards 
            root.style.setProperty('--card-background', 'DarkGray');
            root.style.setProperty('--card-shadow1', 'rgba(0,0,0,0.25)');
            root.style.setProperty('--card-shadow2', 'rgba(0,0,0,0.22)');
            root.style.setProperty('--card-title-light', 'white');
            root.style.setProperty('--card-title-dark', 'black');

            // Info container
            root.style.setProperty('--info-container-percentage-text', '#828282');
            root.style.setProperty('--info-container-border', 'rgba(0, 0, 0, 0.3)');
            root.style.setProperty('--info-container-border-hover', 'rgba(0, 0, 0, 0.6)');
            root.style.setProperty('--info-container-text', '#b54545');

            // Event pills
            root.style.setProperty('--event-pill-green', '#04852f');
            root.style.setProperty('--event-pill-shadow', 'rgba(0, 0, 0, 0.065)');
            root.style.setProperty('--event-pill-date', 'rgba(0, 0, 0, 0.6)');
            root.style.setProperty('--event-pill-name', 'rgba(0, 0, 0, 1)');
            root.style.setProperty('--event-pill-location', 'rgba(0, 0, 0, 0.5)');

            root.style.setProperty('--event-pill-border', 'rgba(35, 217, 96, 0.5)');
            root.style.setProperty('--event-pill-text', 'black');

            root.style.setProperty('--event-active-link', '#2c3e50');
            root.style.setProperty('--event-list-background', '#F5F5F5');
            root.style.setProperty('--event-pending', '#E0932F');
            root.style.setProperty('--event-ongoing', '#4bcc69');
            root.style.setProperty('--event-static', '#2a8dc7');
            root.style.setProperty('--event-ending', '#919191');

            root.style.setProperty('--event-course-name', '#466D85');
            root.style.setProperty('--event-course-title', '#146c91');

            root.style.setProperty('--event-active-background', 'white');
            root.style.setProperty('--event-active-shadow', 'rgba(0, 0, 0, 0.1)');

            root.style.setProperty('--event-location', '#524e0a');

            // Calendar colors for creating lectures
            root.style.setProperty('--calendar-background', '#faa54b');
            root.style.setProperty('--calendar-border', 'rgba(0,0,0,1)');
            root.style.setProperty('--checkins-border', '#faa54b');
            root.style.setProperty('--calendar-selected', 'rgba(67, 42, 130, 1)');
            
            // Statistics but dark
            root.style.setProperty('--stats-panel-background', '#4c4c4c');
            root.style.setProperty('--stats-live-border', '#04dd74');
            root.style.setProperty('--stats-live-fill', '#bfffc6');
            root.style.setProperty('--stats-playback-border', '#3282bf');
            root.style.setProperty('--stats-playback-fill', '#92bed2');
            root.style.setProperty('--stats-absent-border', '#e95454');
            root.style.setProperty('--stats-absent-fill', '#ff8787');
            root.style.setProperty('--stats-panel-shadow', 'rgba(109, 109, 109, 0.644)');

            // ToggleSwitch.vue
            root.style.setProperty('--toggle-switch-on-background', '#bfffc6');
            root.style.setProperty('--toggle-switch-on-ball', '#04dd74');
            root.style.setProperty('--toggle-switch-off-background', '#ff8787');
            root.style.setProperty('--toggle-switch-off-ball', '#e95454');
            root.style.setProperty('--toggle-switch-disabled-background', '#7E7E7E');
            root.style.setProperty('--toggle-switch-disabled-ball', '#4F4F4F');

          } else {

            // Dark mode palette - main (general)
            root.style.setProperty('--main-text-color', '#FFAC5E');
            root.style.setProperty('--main-background-color', '#1d2324');
            root.style.setProperty('--input-background', '#272727');
            root.style.setProperty('--input-border', '#FC7B03');
            root.style.setProperty('--input-text', '#FC7B03');
            root.style.setProperty('--input-shadow', 'rgba(252, 123, 3, 0.83)');

            // Errors 
            root.style.setProperty('--error', '#EE6060'); 
            root.style.setProperty('--error-brighter', '#FF4E4E');

            // Links - venue.css
            root.style.setProperty('--link', '#5597EE');
            root.style.setProperty('--link-hover', '#488BE3');

            root.style.setProperty('--widgets-color', 'brightness(0) invert(1)');
            root.style.setProperty('--clock-color', '');
            root.style.setProperty('--logo-color', '');
            root.style.setProperty('--red-x', 'brightness(0.75) saturate(0.75)');

            root.style.setProperty('--loader-square-even', '#4CC9FF');
            root.style.setProperty('--loader-square-odd', '#FC6E71');
            root.style.setProperty('--loader-square-shadow', 'rgba(128, 128, 128, 0.5)');
            
            
            // Course cards
            root.style.setProperty('--course-card-background', '#FFAC5E');
            root.style.setProperty('--course-card-shadow', 'rgba(79, 171, 13, 0.4)');
            root.style.setProperty('--course-card-text', '#141313');
            root.style.setProperty('--course-number-background', 'rgba(0, 0, 0, 0.86)');
            root.style.setProperty('--course-number-text', '#C1EDFF');

            // Dark mode palette - settings
            root.style.setProperty('--settings-logout-button', 'rgba(110, 148, 186, 1)');   
            root.style.setProperty('--settings-logout-button-shadow', 'rgba(69, 122, 176, 0.8)');
            root.style.setProperty('--settings-small-div', 'rgba(216, 216, 216, 0.64)');
            root.style.setProperty('--settings-logout-hover-text', '#272727');
            root.style.setProperty('--settings-text', '#cccccc');
            root.style.setProperty('--settings-switch-on', '#42f593');
            root.style.setProperty('--settings-switch-off', '#f55442');
            root.style.setProperty('--settings-switch-ball', 'white');

            // ChangePassword.vue
            root.style.setProperty('--change-password-error', '#FC6F71');
            root.style.setProperty('--change-password-success', '#34c759');
            root.style.setProperty('--change-password-success-border', '#158f34');

            // Buttons Palette - lives in venue.core.css
            // .btn-btn-danger has a separate instance of hover & friends in MultiSelectDropdown.vue 
            //  to prevent unfit shadows on the X buttons 
            root.style.setProperty('--button-primary-blue', '#DB6803');
            root.style.setProperty('--button-hover-blue', '#C1702C');
            root.style.setProperty('--button-secondary-grey', '#44A914');
            root.style.setProperty('--button-hover-grey', '#898E4B');
            root.style.setProperty('--button-danger', '#EB5C52');
            root.style.setProperty('--button-danger-shadow', 'rgba(110, 26, 34, 0.74)');
            root.style.setProperty('--button-danger-hover', 'rgba(240, 82, 94, 0.74)');
            root.style.setProperty('--button-tab', '#0078c2');
            root.style.setProperty('--button-tab-text', 'grey');
            root.style.setProperty('--big-button', '#B879E9');
            root.style.setProperty('--big-button-text', 'rgba(59, 36, 66, 1)');
            root.style.setProperty('--big-button-border', 'rgba(135, 24, 219, 0.5)');
            root.style.setProperty('--big-button-shadow', 'rgba(178, 110, 230, 0.444)');
            root.style.setProperty('--button-blue-shadow', 'rgba(22, 92, 8, 0.844)');
            root.style.setProperty('--button-grey-shadow', 'rgba(43, 117, 28, 0.644)');
            root.style.setProperty('--button-text-color', '#1E1212');
            root.style.setProperty('--button-text-hover', '#2B1E1E');

            // Dark mode Palette - Nav bar 
            root.style.setProperty('--nav-bar-text', '#e39144');
            root.style.setProperty('--nav-bar-background', '#3A0E66');
            root.style.setProperty('--nav-bar-separator', 'rgba(247, 162, 109, 0.15)');
            root.style.setProperty('--nav-bar-selected-text', '#EB7B13');
            root.style.setProperty('--nav-bar-box-shadow', 'rgba(183, 127, 240, 0.744)');
            root.style.setProperty('--nav-bar-link-text', '#bcf593');
            root.style.setProperty('--nav-bar-hover-background', '#e39144');
            root.style.setProperty('--nav-bar-hover-text', '#3A0E66');
            root.style.setProperty('--nav-bar-hover-top-shadow', 'rgba(255, 128, 74, 0.644)');
            root.style.setProperty('--nav-bar-hover-bottom-shadow', 'rgba(146, 98, 209, 0.644)'); 

            // Legend green and purple + sections dropdown border
            root.style.setProperty('--sync-border', '#0ac448');
            root.style.setProperty('--async-border', '#9576db');
            root.style.setProperty('--recording-namecard', '#8f3eca');

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
            root.style.setProperty('--foreground-pill', '#f5f5f5');
            root.style.setProperty('--foreground-pill-text', '#000000');
            root.style.setProperty('--foreground-pill-shadow', 'rgba(109, 109, 109, 0.644)');
            root.style.setProperty('--foreground-pill-hover', 'rgba(54, 54, 54, 0.644)');
            root.style.setProperty('--date-and-percent', 'white');
            root.style.setProperty('--course-pill-shadow', 'rgba(109, 109, 109, 0.644)');
            root.style.setProperty('--course-pill-hover', 'rgba(160, 160, 160, 0.644)');

            // Lecture pills con't - these live in LectureCard.vue
            root.style.setProperty('--lecture-live', '#09ed55');
            root.style.setProperty('--lecture-live-closed', '#f09218');
            root.style.setProperty('--lecture-playback', '#a388e3');
            root.style.setProperty('--lecture-recent', '#858585');
            root.style.setProperty('--lecture-upcoming', '#aa58e0');
            root.style.setProperty('--lecture-pill-shadow', 'rgba(75, 117, 45, 0.644)');
            root.style.setProperty('--lecture-info-background', '#b3f584');
            root.style.setProperty('--lecture-course-number-text', '#9433CE'); 
            root.style.setProperty('--lecture-course-name-text', '#26184A');
            root.style.setProperty('--lecture-name-text', '#3a2470');
            root.style.setProperty('--lecture-closed-text', '#B83902');

            // Dark mode palette - lecture attendance
            root.style.setProperty('--lecture-attendance-button-text', '#636363');
            root.style.setProperty('--lecture-attendance-grey-pill', 'rgb(110, 110, 110)');
            root.style.setProperty('--lecture-attendance-grey-shadow', 'rgba(109, 109, 109, 0.8)');
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

            // Lives in dashboardSection.vue -> also main heading color
            root.style.setProperty('--dashboard-text-color', '#A884BE');
            root.style.setProperty('--dashboard-background-color', '#636363');

            // Modal
            root.style.setProperty('--modal-background', '#272727');
            root.style.setProperty('--modal-course-name', '#53788E');
            root.style.setProperty('--modal-course-number', '#2398C8');
            root.style.setProperty('--modal-border', 'grey');
            root.style.setProperty('--modal-container-background', 'rgba(63, 63, 63, 0.65)');
            root.style.setProperty('--modal-lecture-border', 'rgba(120,120,120,1)');

            root.style.setProperty('--poll-background', 'lightskyblue');

            // Cards 
            root.style.setProperty('--card-background', 'DarkGray');
            root.style.setProperty('--card-shadow1', 'rgba(0,0,0,0.25)');
            root.style.setProperty('--card-shadow2', 'rgba(0,0,0,0.22)');
            root.style.setProperty('--card-title-light', 'white');
            root.style.setProperty('--card-title-dark', 'black');

            // Info container
            root.style.setProperty('--info-container-percentage-text', '#828282');
            root.style.setProperty('--info-container-border', 'rgba(0, 0, 0, 0.3)');
            root.style.setProperty('--info-container-border-hover', 'rgba(0, 0, 0, 0.6)');
            root.style.setProperty('--info-container-text', '#b54545');

            // Event pills
            root.style.setProperty('--event-pill-green', '#04852f');
            root.style.setProperty('--event-pill-shadow', 'rgba(0, 0, 0, 0.065)');
            root.style.setProperty('--event-pill-date', 'rgba(0, 0, 0, 0.6)');
            root.style.setProperty('--event-pill-name', 'rgba(0, 0, 0, 1)');
            root.style.setProperty('--event-pill-location', 'rgba(0, 0, 0, 0.5)');

            root.style.setProperty('--event-pill-border', 'rgba(35, 217, 96, 0.5)');
            root.style.setProperty('--event-pill-text', 'black');

            root.style.setProperty('--event-active-link', '#2c3e50');
            root.style.setProperty('--event-list-background', '#F5F5F5');
            root.style.setProperty('--event-pending', '#E0932F');
            root.style.setProperty('--event-ongoing', '#4bcc69');
            root.style.setProperty('--event-static', '#2a8dc7');
            root.style.setProperty('--event-ending', '#919191');

            root.style.setProperty('--event-course-name', '#466D85');
            root.style.setProperty('--event-course-title', '#146c91');

            root.style.setProperty('--event-active-background', 'white');
            root.style.setProperty('--event-active-shadow', 'rgba(0, 0, 0, 0.1)');

            root.style.setProperty('--event-location', '#524e0a');

            // Calendar colors for creating lectures
            root.style.setProperty('--calendar-background', '#faa54b');
            root.style.setProperty('--calendar-border', 'rgba(0,0,0,1)');
            root.style.setProperty('--checkins-border', '#faa54b');
            root.style.setProperty('--calendar-selected', 'rgba(67, 42, 130, 1)');
            
            // Statistics but dark
            root.style.setProperty('--stats-panel-background', '#4c4c4c');
            root.style.setProperty('--stats-live-border', '#04dd74');
            root.style.setProperty('--stats-live-fill', '#bfffc6');
            root.style.setProperty('--stats-playback-border', '#3282bf');
            root.style.setProperty('--stats-playback-fill', '#92bed2');
            root.style.setProperty('--stats-absent-border', '#e95454');
            root.style.setProperty('--stats-absent-fill', '#ff8787');
            root.style.setProperty('--stats-panel-shadow', 'rgba(109, 109, 109, 0.644)');

            // ToggleSwitch.vue
            root.style.setProperty('--toggle-switch-on-background', '#bfffc6');
            root.style.setProperty('--toggle-switch-on-ball', '#04dd74');
            root.style.setProperty('--toggle-switch-off-background', '#ff8787');
            root.style.setProperty('--toggle-switch-off-ball', '#e95454');
            root.style.setProperty('--toggle-switch-disabled-background', '#7E7E7E');
            root.style.setProperty('--toggle-switch-disabled-ball', '#4F4F4F');
          }
    }
}

//brightness(0.75) saturate(0.75)

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