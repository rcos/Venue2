from http.server import HTTPServer, BaseHTTPRequestHandler, SimpleHTTPRequestHandler
from http.cookiejar import DefaultCookiePolicy, CookiePolicy, CookieJar
from os import system, name
#from six.moves.http_cookies import Morsel

import socket
import sys
import urllib.request

yes_words = ['y', 'ye', 'yes']
no_words = ['n', 'no', 'nope']

auto_words = ['a', 'auto', 'automatic', 'do_it_for_me_peasant']

true_words = ['t', 'tru', 'true', yes_words]
false_words = ['f', 'false', no_words]

AUTH_PORT = 4000
LOCAL_PORT = 8080

DEFAULT_CONFIG_NOTES = {
    "use_config": """
# Use Config determines whether or not the script should use the values provided in this document. 
# Should something happen that corrupts this file and the values are getting read but are not right, you can 
# reset it by either deleting this file or setting this value to [FALSE]. As of now, manual mode has not been 
# implemented, so this should be kept at [TRUE] unless something gets corrupt.\n\n\n""",
    "old_ip": """
# Provided the old IP is not the new IP, every instance of the old IP will be replaced with new IP.
# The integrity check function will let you know if it detects irregularities between the number of IP's
# each file is supposed to have vs. the amount of IP's it does have. This does not include domains.\n\n\n""",
    "new_ip": "",
    "samesite": """
# SameSite is a property that lives inside the login cookie that makes it possible to login and logout from a different IP.
# This is default [FALSE] because it's a security feature that improves the integrity of a cookie.
# If logging in doesn't work from a non-localhost IP, set this to [TRUE] - but make sure to set it to [FALSE] before doing a PR!!!""",
    "cross_origin": """
# Cross origin is the big brother of SameSite when it comes to cookie security. Setting cross origin to [TRUE] will let you log in
# from both localhost AND new_ip. Leaving cross origin set to false will make the site only accessible from the new_ip.
# Caution must be taken when changing this value, make sure you set it to [FALSE] before a PR!!!
# * The line "origin:" in server/server.js should have 3 origins: venue-meetings.com, localhost, googleStorageApi""",
    "warnings": """
# Fatal errors will still be printed in red and most likely crash the program, but yellow warnings will not get printed if this is set to [FALSE].
    """,
    "use_getch": """
# Getch is a python library that allows the use of arrow keys in the input buffer. If you set use_getch to [FALSE] then you can still
# use numbers to select your desired action in the main menu, but it won't feel as cool as using arrow keys. 
    """,
    "final": """
# It is important that variables with an underscore in their name keep their underscore, and it is important that no extra words exist
# on the same line as each variable declaration. Stray marks will be left alone when the program repairs / restores a config file and in the future
# check will check for SameSite and Cross Origin, but in the meantime my friends, stay groovy 😎"""
    
}
NUM_VARIABLES = 7

IP_COUNT = {
    "server/Auth/Auth.route.js": 5,
    "server/Lecture/Lecture.route.js": 2,
    "server/DB.js": 1,
    "server/seed.js": 1,
    "server/server.js": 1,
    "public/index.html": 1,
    "cypress/integration/landing_page.spec.js": 2,
    "cypress/integration/api/course_api.spec.js": 9,
    "cypress/integration/api/lecture_api.spec.js": 9,
    "cypress/integration/api/lectureSubmission_api.spec.js": 8,
    "cypress/integration/api/playbackPoll_api.spec.js": 3, 
    "cypress/integration/api/section_api.spec.js": 13,
    "cypress/integration/api/user_api.spec.js": 13,
    "cypress/support/commands.js": 1,
    "src/components/RestrictedPlayback.vue": 1,
    "src/components/UnrestrictedPlayback.vue": 1,
    "src/routes.js": 1,
    "src/App.vue": 1,
    "src/views/CourseInfo.vue": 1,
    "src/views/LandingPage.vue": 1,
    "src/views/LecturePlayback.vue": 1,
    "src/services/API.js": 1,
    "cypress.json": 1
}

# Options and defaults
class OPTIONS:
    use_config = True 
    old_ip = 'localhost'
    new_ip = 'auto'
    warnings = True 
    use_getch = True
    manual = False
    SameSite = False
    cross_origin = False

CONFIG = "set_ip_config.txt"
HOST = socket.gethostname()
IP = socket.gethostbyname(HOST)

#Morsel._reserved[str('samesite')] = str('SameSite')

# FILES THAT CONTAIN THE IP TO HOST THE SERVER
server_route_files = ["server/Auth/Auth.route.js", "server/Lecture/Lecture.route.js"]
server_files = ["server/DB.js", "server/seed.js", "server/server.js"]
public_files = ["public/index.html"]
cypress_files = ["cypress/integration/landing_page.spec.js", "cypress/integration/api/course_api.spec.js", "cypress/integration/api/lecture_api.spec.js", "cypress/integration/api/lectureSubmission_api.spec.js", "cypress/integration/api/playbackPoll_api.spec.js", "cypress/integration/api/section_api.spec.js", "cypress/integration/api/user_api.spec.js", "cypress/support/commands.js"]
src_components = ["src/components/RestrictedPlayback.vue", "src/components/UnrestrictedPlayback.vue", "src/routes.js", "src/App.vue"]
src_views = ["src/views/CourseInfo.vue", "src/views/LandingPage.vue", "src/views/LecturePlayback.vue"]
src_api = ["src/services/API.js"]
root_files = ["cypress.json"]

files = [server_route_files, server_files, public_files, cypress_files, src_api, src_components, src_views, root_files]

class bcolors:
    YELLOW = '\033[93m'
    GREEN = '\033[92m'
    RED = '\033[91m'
    BLUE = '\u001b[34m'
    RESET = '\033[0m'
    PINK = '\u001b[31;1m'
    CYAN = '\u001b[36;1m'

class Redirect(SimpleHTTPRequestHandler):
    def do_GET(self):
        self.redirect()
    def do_POST(self):
        self.redirect()
    def do_DELETE(self):
        self.redirect()
    def do_PUT(self):
        self.redirect()
    def redirect(self):
        #print(myCookiePolicy)
        self.send_response(307)
        self.send_header('Location', 'http://192.168.1.12:8080')
        self.end_headers()

def cls():
    if name == 'nt':
        _ = system('cls')
    else:
        _ = system('clear')

# Get user's current IP set to host venue on
def get_current_ip():
    print("Opening " + bcolors.GREEN + "server/DB.js" + bcolors.RESET)
    try: 
        f = open(server_files[0])
        file_data = f.read()
        f.close()
        if f:
            print(bcolors.GREEN + "OK" + bcolors.RESET)
        else:
            print(bcolors.YELLOW + "server/DB.js found " + bcolors.RED + "-- FILE EMPTY")
            exit(1)
    except FileNotFoundError:
        print(bcolors.RED + "server/DB.js NOT FOUND " + bcolors.RESET + "are you in the project's root directory?")
        exit(1)

    # Parse file and get IP
    lines = file_data.split('\n')
    for i in lines:
        if (i.count('mongodb://') == 1 and i.count(':27017/Venue2') == 1):
            ip = i.replace('mongodb://', '')
            ip = ip.replace(':27017/Venue2', '')
            ip = ip.replace('DB:', '')
            ip = ip.split()
            print(bcolors.GREEN + "CURRENT IP SET TO HOST VENUE: " + bcolors.RESET + ip[0])
            return ip[0].replace("'", '')

    # Error if no IP by this point
    print(bcolors.GREEN + "server/DB.js exists, the file is not empty, yet no IP was found")

# Replace all instances of old_ip with new_ip
def set_ip(old_ip, new_ip):
    print("Parsing thru files with:")
    print("OLD IP: " + bcolors.GREEN + old_ip + bcolors.RESET)
    print("NEW IP: " + bcolors.GREEN + new_ip + bcolors.RESET)
    for section in files:
        for i in section:
            print()
            print("Opening " + bcolors.GREEN + i + bcolors.RESET)
            try:
                f = open(i)
                file_data = f.read()
                f.close()
                lines = file_data.split('\n')

                # Check if file is empty
                if len(lines) >= 2:
                    print(bcolors.GREEN + "OK" + bcolors.RESET)
                else:
                    print(bcolors.YELLOW + i + " found " + bcolors.RED + "-- FILE EMPTY" + bcolors.RESET)
                    exit(1)

                count = 0
                instances = []
                cookie_changes = []
                cors_policy = []
                for j in range(len(lines) - 1):
                    if 'server.js' in i:
                        if 'origin:' in lines[j]:
                            if OPTIONS.cross_origin and new_ip != 'localhost':
                                ip_in_line = "'http://" + old_ip + ":" + str(LOCAL_PORT) + "', 'http://localhost:" + str(LOCAL_PORT) + "', "
                                replacement = "'http://" + new_ip + ":" + str(LOCAL_PORT) + "', 'http://localhost:" + str(LOCAL_PORT) + "', "
                                # prevent infinite origins
                                if lines[j].count(replacement) == 1 and old_ip == 'localhost':
                                    continue
                                if ip_in_line in lines[j]:
                                    lines[j] = lines[j].replace(ip_in_line, replacement)
                                elif old_ip in lines[j]:
                                    print('called')
                                    print(replacement)
                                    lines[j] = lines[j].replace("'http://" + old_ip + ":" + str(LOCAL_PORT) + "', ", replacement)
                                    cors_policy.append(j)
                                if old_ip != new_ip:
                                    instances.append(j)
                                    #cors_policy.append(j)
                            else:
                                if 'localhost' in lines[j] and old_ip != 'localhost':
                                    lines[j] = lines[j].replace("'http://localhost:" + str(LOCAL_PORT) + "', ", '')
                                    cors_policy.append(j)
                                lines[j] = lines[j].replace(old_ip, new_ip)
                                if old_ip != new_ip:
                                    instances.append(j)
                                    #cors_policy.append(j)
                    elif (lines[j].count(old_ip) >= 1 and old_ip != new_ip):
                        count += 1
                        instances.append(j)
                        lines[j] = lines[j].replace(old_ip, new_ip)
                    if "Auth.route.js" in i:
                        if OPTIONS.SameSite and lines[j].count('Set-Cookie') > 0 and lines[j].count('SameSite') == 0 and lines[j].count('expires') == 0:
                            count += 1
                            cookie_changes.append(j)
                            lines[j] = lines[j].replace('Set-Cookie', 'Set-Cookie: SameSite=None; Secure')
                        elif OPTIONS.SameSite == False and lines[j].count('SameSite') > 0:
                            count += 1
                            cookie_changes.append(j)
                            lines[j] = lines[j].replace('Set-Cookie: SameSite=None; Secure', 'Set-Cookie')

                f = open(i, "w")
                for line in lines:
                    if (len(line) > 0):
                        f.write(line + '\n')
                
                if (len(instances) >= 1 or len(cookie_changes) >= 1 or len(cors_policy) >= 1):
                    for k in instances:
                        print("CHANGED IP FROM " + str(old_ip) + " TO " + str(new_ip) + " IN LINE " + str(k + 1) + " IN " + bcolors.GREEN + i + bcolors.RESET)
                    for m in cookie_changes:
                        print("CHANGED SAMESITE FROM " + str(not OPTIONS.SameSite) + " TO " + str(OPTIONS.SameSite) + " IN LINE " + str(m + 1) + " IN " + bcolors.GREEN + i + bcolors.RESET)
                    for l in cors_policy:
                        print("CHANGED CROSS_ORIGIN FROM " + str(not OPTIONS.cross_origin) + " TO " + str(OPTIONS.cross_origin) + " IN LINE " + str(l + 1) + " IN " + bcolors.GREEN + i + bcolors.RESET)
                else:
                    if OPTIONS.warnings:
                        print(bcolors.YELLOW + i + " WAS PARSED, BUT NOTHING WAS CHANGED" + bcolors.RESET)

            except FileNotFoundError:
                print(bcolors.GREEN + i + bcolors.RED + " DOES NOT EXIST" + bcolors.RESET)
                exit(1)  

# Check all IPs
def integrity_check():

    def ip_report(count, ips, scanned_file):
        #print(scanned_file)
        #print(count)
        #print(ips)
        error_lines = []
        if count != IP_COUNT[scanned_file]:
            print(bcolors.YELLOW + "WARNING: " + bcolors.GREEN + scanned_file +  " has " + bcolors.RED + str(count) + bcolors.RESET + " IP addresses,\n it should have " + bcolors.GREEN + str(IP_COUNT[scanned_file]) + bcolors.RESET)
            if OPTIONS.warnings:
                print(ips)
        for i in range(len(ips)):
            if ips[i][0] != OPTIONS.new_ip:
                print(bcolors.YELLOW + "An irregularity was detected.")
                print("The IP in line: " + bcolors.RESET + str(ips[i][1]) + bcolors.YELLOW + \
                        " is different than new_ip: " + bcolors.RESET + str(OPTIONS.new_ip)) 


    for section in files:
        for i in section:
            print()
            print("Opening " + bcolors.GREEN + i + bcolors.RESET)
            try:
                f = open(i, 'r')
                file_data = f.read()
                f.close()
                lines = file_data.split('\n')

                # Check if file is empty
                if len(lines) >= 2:
                    print(bcolors.GREEN + "OK" + bcolors.RESET)
                else:
                    print(bcolors.YELLOW + i + " found " + bcolors.RED + "-- FILE EMPTY" + bcolors.RESET)
                    exit(1)

                count = 0
                ips = []
                ip_bits = []
                for j in range(len(lines) - 1):
                    if lines[j].count('http://') > 0 and lines[j].count(':') > 0 or lines[j].count('%3A') > 0 or lines[j].count('mongodb://') > 0:
                        if (':' + str(AUTH_PORT) in lines[j]):
                            ip_pieces = lines[j].split(':' + str(AUTH_PORT))
                        if (':' + str(LOCAL_PORT) in lines[j]):
                            ip_pieces = lines[j].split(':' + str(LOCAL_PORT))
                        if (':27017' in lines[j]):
                            ip_pieces = lines[j].split(':27017')
                        if ('%3A' in lines[j]):
                            ip_pieces = lines[j].split('%3A')
                        for k in ip_pieces:
                            if 'http://' in k:
                                ip_bits = k.split('http://')
                            if 'mongodb://' in k:
                                ip_bits = k.split('mongodb://')
                            if 'F' in k and 'loginCAS' not in k:
                                ip_bits = k.split('F')
                            ip = ''
                            if not ip_bits:
                                continue
                            #print(ip_bits, str(j+1))
                            for m in range(len(ip_bits)):
                                try:
                                    int(ip_bits[m])
                                except ValueError:
                                    continue
                                ip += ip_bits[m] + '.'
                            ip += ip_bits[-1]
                            if '%' in ip:
                                ip = ip.replace('%', '')
                        if valid_ip(ip):
                            count += 1
                            ips.append((ip, j+1))

                ip_report(count, ips, i)
                                
            except FileNotFoundError:
                print('e')

# get ip from user input
def get_ip(prompt):
    ip = None
    while (ip == None):
        ip = input(prompt)
        if valid_ip(ip):
            if ip in auto_words:
                return 'automatic'
            return ip
        elif ip in auto_words:
            return 'automatic'
        else:
            print("Invalid IP")
            ip = None
            continue


# The method for adding / fixing corrupt values
def mend(i, mode):
    if mode:
        f = open(CONFIG, mode)
    if 'use_config:' in i.lower():
        print("Set use_config to true?")
        if yes_or_no():
            i = "\tuse_config: true\n"
        else:
            i = "\tuse_config: false\n"  
        f.write(DEFAULT_CONFIG_NOTES["use_config"])
        f.write(i + '\n')
        return 'use_config'
    elif 'warnings:' in i.lower():
        print("Set warnings to on?")
        if yes_or_no():
            i = "\twarnings: true\n"
        else:
            i = "\twarnings: false\n"
        f.write(DEFAULT_CONFIG_NOTES["warnings"])   
        f.write(i + '\n')
        return 'warnings'
    elif 'new_ip:' in i.lower():
        ip = get_ip("Enter the IP to use in the future (new_ip): ")
        i = '\t' + 'new_ip: ' + ip + '\n'
        f.write(i + '\n')
        f.write(DEFAULT_CONFIG_NOTES["new_ip"])
        return 'new_ip' 
    elif 'samesite:' in i.lower():
        print("Set SameSite to true?")
        if yes_or_no():
            i = "\tSameSite: true\n"
        else:
            i = "\tSameSite: false\n"  
        f.write(DEFAULT_CONFIG_NOTES["samesite"])
        f.write(i + '\n')
        return 'samesite'
    elif 'old_ip:' in i.lower():
        ip = get_ip('Enter the IP to replace (old_ip): ')
        i = '\t' + 'old_ip: ' + ip + '\n'
        f.write(DEFAULT_CONFIG_NOTES["old_ip"])
        f.write(i + '\n')
        return 'old_ip'
    elif 'use_getch:' in i.lower():
        print("Set use_getch to true?")
        if yes_or_no():
            i = "\tuse_getch: true\n"
        else:
            i = "\tuse_getch: false\n"  
        f.write(DEFAULT_CONFIG_NOTES["use_getch"])
        f.write(i + '\n')
        return 'use_getch'
    elif 'cross_origin:' in i.lower():
        print("Allow-Access-origin-control?")
        if yes_or_no():
            i = "\tcross_origin: true\n"
        else:
            i = "\tcross_origin: false\n"  
        f.write(DEFAULT_CONFIG_NOTES["cross_origin"])
        f.write(i + '\n')
        return 'use_getch'

def create_config(prompt):
    print(prompt)
    overwrite = False
    if yes_or_no():
        if ('fix' in prompt):
            print(bcolors.GREEN + " Since you already have a config file and only wish to restore it, \n \
            any non-variable mark will be left alone" + bcolors.RESET)
            print(bcolors.RED + " -- Words on the same line as a variable will be removed" + bcolors.RESET)
        else:
            overwrite = True
            f = open(CONFIG, 'w')

        # Overwrite handler
        if not overwrite:
            print(bcolors.YELLOW + "Unless you want to start from scratch?" + bcolors.RESET)
            overwrite = True if yes_or_no() == True else False

        f = open('set_ip_config.txt', 'r')
        file_data = f.read()
        f.close()

        if overwrite:
            f = open(CONFIG, 'w')
        else:
            f = open(CONFIG, 'a')
        
        if not overwrite:
            variables = ['use_config', 'old_ip', 'new_ip', 'warnings', 'use_getch', 'SameSite', 'cross_origin']
            variables_replaced = []
            if file_data:
                lines = file_data.split('\n')
                for i in lines:
                    if len(i.split()) > 0 and len(i.split()[0]) > 0:
                        variables_replaced.append(mend(i.split()[0]))

            else:
                for i in variables:
                    if i not in variables_replaced:
                        variables_replaced.append(mend(i + ':'))
                print("Successfully mended " + bcolors.GREEN + CONFIG + bcolors.RESET)

        else: 
            # Use_config
            f.write(DEFAULT_CONFIG_NOTES["use_config"])
            print("Set use_config to true?")
            if yes_or_no():
                i = "\tuse_config: true\n"
            else:
                i = "\tuse_config: false\n"  
            f.write(i + '\n')

            # Old IP
            f.write(DEFAULT_CONFIG_NOTES["old_ip"])
            ip = get_ip('Enter the IP to replace (old_ip): ')
            i = '\t' + 'old_ip: ' + ip + '\n'
            f.write(i + '\n')

            # New IP
            f.write(DEFAULT_CONFIG_NOTES["new_ip"])
            ip = get_ip("Enter the IP to use in the future (new_ip): ")
            i = '\t' + 'new_ip: ' + ip + '\n'
            f.write(i + '\n')

            # SameSite
            f.write(DEFAULT_CONFIG_NOTES["samesite"])
            print("Use SameSite?")
            if yes_or_no():
                i = "\tSameSite: true\n"
            else:
                i = "\tSameSite: false\n"   
            f.write(i + '\n')

            # Cross Origin
            f.write(DEFAULT_CONFIG_NOTES["cross_origin"])
            print("Allow-Access-Cross-Origin?")
            if yes_or_no():
                i = "\tcross_origin: true\n"
            else:
                i = "\tcross_origin: false\n"   
            f.write(i + '\n')

            # Warnings
            f.write(DEFAULT_CONFIG_NOTES["warnings"])
            print("Set warnings to on?")
            if yes_or_no():
                i = "\twarnings: true\n"
            else:
                i = "\twarnings: false\n"   
            f.write(i + '\n')

            # Use Getch
            f.write(DEFAULT_CONFIG_NOTES["use_getch"])
            print("Set use_getch to true?")
            if yes_or_no():
                i = '\t' + 'use_getch: true' + '\n'
            else:
                i = '\t' + 'use_getch: false' + '\n'  
            f.write(i + '\n')

            f.write(DEFAULT_CONFIG_NOTES["final"])

            f.close()

        # After all that check if we can actually read config
        if init_settings():
            return True

    else:
        OPTIONS.manual = True
        print(bcolors.YELLOW + "OK " + bcolors.RESET + "The script will run in manual mode")
        print(bcolors.YELLOW + ":P " + bcolors.GREEN + " - Not yet implemented." + bcolors.RESET)
        exit()
        return 'MANUAL'    



def read_config(CONFIG):
    print("Reading " + bcolors.GREEN + CONFIG + bcolors.RESET)
    try:
        f = open(CONFIG, 'r')
        file_data = f.read()
        f.close()
        variables = ['use_config', 'old_ip', 'new_ip', 'warnings', 'use_getch', 'SameSite', 'cross_origin']
        if not file_data:
            print(bcolors.YELLOW + "A config file was found, but appears to be empty" + bcolors.RESET)
            create_config("Would you like to fill it?")   
        else:
            lines = file_data.split('\n')
            variables_replaced = []
            for i in lines:
                if len(i.split()) > 0:
                    if 'use_config:' in i.split()[0].lower():
                        if i.lower().replace('use_config:', '').split()[0].lower() in true_words:
                            USE_CONFIG = True
                        elif i.lower().replace('use_config:', '').split()[0].lower() in false_words:
                            USE_CONFIG = False
                        else:
                            print(bcolors.RED + "The value for use_config was not recognized" + bcolors.RESET)
                            return False
                        variables_replaced.append('use_config')
                    elif 'warnings:' in i.split()[0].lower():
                        if i.lower().replace('warnings:', '').split()[0].lower() in true_words:
                            WARN = True
                        elif i.lower().replace('warnings:', '').split()[0].lower() in false_words:
                            WARN = False
                        else:
                            print(bcolors.RED + "The value for warnings was not recognized" + bcolors.RESET)
                            return False
                        variables_replaced.append('warnings')
                    elif 'cross_origin:' in i.split()[0].lower():
                        if i.lower().replace('cross_origin:', '').split()[0].lower() in true_words:
                            CROSS_ORIGIN = True
                        elif i.lower().replace('cross_origin:', '').split()[0].lower() in false_words:
                            CROSS_ORIGIN = False
                        else:
                            print(bcolors.RED + "The value for cross_origin was not recognized" + bcolors.RESET)
                            return False
                        variables_replaced.append('cross_origin')
                    elif 'new_ip:' in i.split()[0].lower():
                        if valid_ip(i.lower().replace('new_ip:', '').split()[0]):
                            NEW_IP = i.lower().replace('new_ip:', '').split()[0]
                        else:
                            print(bcolors.RED + "The value for new_ip is not a valid IP" + bcolors.RESET)
                            return False
                        variables_replaced.append('new_ip') 
                    elif 'old_ip:' in i.split()[0].lower():
                        if valid_ip(i.lower().replace('old_ip:', '').split()[0]):
                            OLD_IP = i.lower().replace('old_ip:', '').split()[0]
                        else:
                            print(bcolors.RED + "The value for old_ip is not a valid IP" + bcolors.RESET)
                            return False
                        variables_replaced.append('old_ip') 
                    elif 'samesite:' in i.split()[0].lower():
                        if i.lower().replace('samesite:', '').split()[0].lower() in true_words:
                            SAMESITE = True
                        elif i.lower().replace('samesite:', '').split()[0].lower() in false_words:
                            SAMESITE = False
                        else:
                            print(bcolors.RED + "The value for SameSite was not recognized" + bcolors.RESET)
                            return False
                        variables_replaced.append('SameSite')
                    elif 'use_getch:' in i.split()[0].lower():
                        if i.lower().replace('use_getch:', '').split()[0].lower() in true_words:
                            USE_GETCH = True
                        elif i.lower().replace('use_getch:', '').split()[0].lower() in false_words:
                            USE_GETCH = False
                        else:
                            print(bcolors.RED + "The value for use_getch was not recognized" + bcolors.RESET)
                            return False
                        variables_replaced.append('use_getch')
        f.close()        

        # If there is an error reading, this will catch it
        if not overwrite_summary(variables, variables_replaced):
            return False
        
    except FileNotFoundError:
        print(bcolors.RED + "NO CONFIG FILE FOUND" + bcolors.RESET) 
        try:
            directory_check = open('readme.md')
            create_config("Would you like to create one?")
        except FileNotFoundError:
            print(bcolors.YELLOW + "Are you in the root directory?" + bcolors.RESET) 
            exit(1)

    return (USE_CONFIG, OLD_IP, NEW_IP, SAMESITE, WARN, USE_GETCH, CROSS_ORIGIN)
       

# Initialize settings from config file
def init_settings():
    """if not read_config(CONFIG):
        return False """
    settings = read_config(CONFIG)
    if len(settings) == NUM_VARIABLES:
        OPTIONS.use_config = settings[0]
        OPTIONS.old_ip = settings[1]
        OPTIONS.new_ip = settings[2]
        OPTIONS.SameSite = settings[3]
        OPTIONS.warnings = settings[4]
        OPTIONS.use_getch = settings[5]
        OPTIONS.cross_origin = settings[6]
    elif OPTIONS.manual:
        return True
    elif settings == 0:
        return 'e'
    else:
        print('called')
        return False

    print(OPTIONS.use_config)
    print(OPTIONS.old_ip)
    print(OPTIONS.new_ip)
    print(OPTIONS.SameSite)
    print(OPTIONS.warnings)
    print(OPTIONS.use_getch)
    return True

def overwrite_summary(variables, variables_replaced):
    errors = 0
    error_variables = []
    missing_variables = []
    for i in variables_replaced:
        if variables_replaced.count(i) > 1 and i not in error_variables: 
            error_variables.append(i)
            print(bcolors.YELLOW + "WARNING" + bcolors.RESET + " - There is more than one instance of " + bcolors.GREEN + i + bcolors.RESET + " in config file")

    for i in variables:
        if i not in variables_replaced:
            print(bcolors.RED + "WARNING - Config file is missing " + bcolors.GREEN + i + bcolors.RESET)
            missing_variables.append(i)
            errors = 1

    if errors == 1:
        #print(missing_variables)
        for i in missing_variables:
            mend(i + ':', 'a')
    else:
        return True
        

def remove_brackets(string):
    clean_line = ''
    no_append = False
    for i in range(len(string)):
        if string[i] == '<':
            no_append = True
        elif string[i] == '>' and no_append:
            no_append = False
        else:
            if (not no_append):
                clean_line += str(string[i])

    clean_line = clean_line.replace('&quot;', '"')

    if len(clean_line.strip()) > 0:
        return clean_line

# False for no, True for yes
def yes_or_no():
    choice = None
    while(choice == None):
        choice = input("(Y/N)? ")
        if choice.lower() in yes_words:
            return True
        elif choice.lower() in no_words:
            return False
        else:
            choice = None
            continue

# Check if provided IP is Valid
def valid_ip(ip):
    if not ip:
        return False
    if (ip == 'localhost' or ip in auto_words):
        return True
    elif (len(ip.split('.')) == 4):
        for i in ip.split('.'):
            try:
                int(i)
            except ValueError:
                return False
        return True
    # Very limited IPv6 support
    elif (len(ip.split(':')) > 4):
        return True
    else:
        return False

# Return True if getch() exists
def check_getch():
    try:
        f = open("getch.py")
        data = f.read()
        f.close()
        if not data:
            #print(bcolors.GREEN + "getch.py " + bcolors.RESET + "exists, " + bcolors.YELLOW + " the file is empty" + bcolors.RESET)
            return False
        else:
            return True
    except FileNotFoundError:
        print(bcolors.RED + "getch.py NOT FOUND - " + bcolors.RESET + "are you in the right directory?")
        return False

# Python getch() - A script that auto - handles which getch() to use based on OS
# Credit goes to Joe Esposito (https://github.com/joeyespo)
def build_getch():

    # Check if getch.py exists
    overwrite = False
    if check_getch():
        print(bcolors.YELLOW + "WARNING: " + bcolors.GREEN + "getch.py " + bcolors.RESET + "exists, overwrite?")
        if yes_or_no():
            overwrite = True
        else:
            return 1
    else:
        overwrite = True
    
    if overwrite:
        f = open("getch.py", "w")

        # Open the URL and pull out the parts we need
        a = urllib.request.urlopen('https://github.com/joeyespo/py-getch/blob/master/getch/getch.py')
        file_data = a.read()
        a.close()
        lines = file_data.split(b'\n')
        strlines = []
        for i in lines:
            strlines.append(i.decode('utf-8'))
        #print(strlines)
        method_lines = []
        for i in range(len(strlines)):
            # Get lines we want by using start line and end line params
            if 'try' in strlines[i] and ':' in strlines[i]:
                while 'TCSADRAIN' not in strlines[i]: 
                    method_lines.append(strlines[i])
                    i += 1
                method_lines.append(strlines[i])
                break

        clean_lines = []
        # Clean the HTML tags out of the lines
        for i in method_lines:
            clean_lines.append(remove_brackets(i))

        # Write getch.py
        tab_count = 0
        for i in clean_lines:
            if i:
                if i.strip().startswith('except') or i.strip().startswith('finally'):
                    tab_count -= 1
                f.write('\t' * tab_count + i.strip() + '\n')
                if i[-1] == ':':
                    tab_count += 1

        f.close()

        try:
            from getch import getch
            print(bcolors.GREEN + "getch.py created successfully" + bcolors.RESET)
            return True
        except:
            print(bcolors.RED + "There was an error creating getch.py" + bcolors.RESET)
            return False

# Get arrow key as input
def get_arrow_key(selected):

    try:
        from getch import getch
    except:
        print(bcolors.RED + "getch.py is not installed properly, arrow functions will not work" + bcolors.RESET)
        return False


    while True:
        char = getch()
        #print(char)
        if (char == b'\x00'):
            char = getch()
            if (char == b'H'):
                if selected == 1:
                    return 3
                else:
                    return selected - 1
            elif (char == b'K'):
                return 'LEFT'
            elif (char == b'M'):
                return 'RIGHT'
            elif (char == b'P'):
                if selected == 3:
                    return 1
                else:
                    return selected + 1
        if (char == b'\r'):
            return (selected, 'ENTER')
        if (char == b'\x03'):
            exit()

# TODO
def print_logo():
    print('\n' * 10)
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'ssshmM' + (' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'mdysy')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'm+++++sd' + (' ' * len('MMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'yooooo')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'o++++++sd' + (' ' * len('MMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'myoooooos')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'd++++++++sd' + (' ' * len('MMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'dsooooooood')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'o+++++++++sdN' + (' ' * len('MMMMMMMMMMM')) + bcolors.CYAN + 'msooooooooos')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'h+++++++++++odN' + (' ' * len('MMMMMM')) + bcolors.CYAN + 'Ndsoooooooooooh')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'N+++++++++++++odN' + (' ' * len('MM')) + bcolors.CYAN + 'NdsoooooooooooooN')
    print(' ' + bcolors.CYAN + 'mddmNN' + (' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'y++++++++++++++oh' + bcolors.CYAN + 'dsooooooooooooooy' + bcolors.PINK +  (' ' * len('MMMMMMMMMMMMMMMMMMMMMMM')) + 'NNmdhhdm')
    print('  ' + bcolors.CYAN + 'NoooooosyhdmNN' + (' ' * len('MMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'm+++++++++++++++++' + bcolors.CYAN + 'ooooooooooooooom' + bcolors.PINK + (' ' * len('MMMMMMMMMMMMMMMMM')) + 'NNmdysoo++++++N')
    print('   ' + bcolors.CYAN + 'hooooooooooosyhdmNN' + (' ' * len('MMMMMMMMMMMM')) + bcolors.PINK + 's+++++++++++++++++++' + bcolors.CYAN + 'oooooooooooy' + bcolors.PINK + (' ' * len('MMMMMMMMMMMM')) + 'NNmdysoo++++++++++od')
    print('   ' + bcolors.CYAN + 'myooooooooooooooosyydmNN' + (' ' * len('MMMMMMM')) + bcolors.PINK + 'd+++++++++++++++++++++' + bcolors.CYAN + 'ooooooooom' + bcolors.PINK + (' ' * len('MMMMMM')) + 'NNmdyso++++++++++++++++yN')
    print('     ' + bcolors.CYAN + 'dsooooooooooooooooooosyhhmNN' + (' ' * len('MM')) + bcolors.PINK + 'o+++++++++++++++++++++ooooooosNNmdyso++++++++++++++++++++od')
    print((' ' * len('MMMMMM')) + bcolors.CYAN + 'Nyoooooooooooooooooooooooosyys' + bcolors.PINK + '+++++++++++++++++++++++ooooooso+++++++++++++++++++++++++yN')
    print((' ' * len('MMMMMMMM')) + bcolors.CYAN + 'dsoooooooooooooooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++++++++++++++++++++++++++od')
    print((' ' * len('MMMMMMMMM')) + bcolors.CYAN + 'Nyoooooooooooooooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++++++++++++++++++++++++yN')
    print((' ' * len('MMMMMMMMMMM')) + bcolors.CYAN + 'msoooooooooooooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++++++++++++++++++++++om')
    print((' ' * len('MMMMMMMMMMMM')) + bcolors.CYAN + 'Nhooooooooooooooooooooooo' + bcolors.PINK + '+++++++++++++++++++++++++++++++++++++++++++++++++h')
    print((' ' * len('MMMMMMMMMMMMMM')) + bcolors.CYAN + 'msoooooooooooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++++++++++++++++++sm')
    print((' ' * len('MMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'hooooooooooooooooooooo' + bcolors.PINK + '+++++++++++++++++++++++++++++++++++++++++++++h')
    print((' ' * len('MMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'Nsoooooooooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++++++++++++++sN')
    print((' ' * len('MMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'dooooooooooooooooooo' + bcolors.PINK + '+++++++++++++++++++++++++++++++++++++++++d')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'Nyoooooooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++++++++++yN')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'dsoooooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++++++++od')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'Nyoooooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++++++yN')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'msoooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++++om')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'Nhoooooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++++yN')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'msoooooooooooo' + bcolors.PINK + '++++++++++++++++++++++++++++sm')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'dooooooooooo' + bcolors.PINK + '+++++++++++++++++++++++++++hN')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'Nyoooooooooo' + bcolors.PINK + '++++++++++++++++++++++++sm')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'dsoooooooo' + bcolors.PINK + '++++++++++++++++++++++oh')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'Nyoooooooo' + bcolors.PINK + '++++++++++++++++++++sN')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'dsoooooo' + bcolors.PINK + '++++++++++++++++++od')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'Nhoooooo' + bcolors.PINK + '++++++++++++++++yN')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'msoooo' + bcolors.PINK + '++++++++++++++od')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'Nhoooo' + bcolors.PINK + '++++++++++++yN')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'myoo' + bcolors.PINK + '++++++++++om')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.CYAN + 'ds' + bcolors.PINK + '+++++++++hN')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'Ny++++++sm')
    print((' ' * len('MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM')) + bcolors.PINK + 'dssssh')
    print(bcolors.RESET + '\n')

def print_options(selected):
    options = [("1. Set IP", 1), ("2. Integrity Check", 2), ("3. Restore Config File", 3)]
    for i in options:
        if i[1] == selected:
            print(bcolors.GREEN + i[0] + bcolors.RESET)
        else:
            print(i[0])

# Choice between 1 and 3
def get_choice(prompt):
    choice = None
    while(choice == None):
        try:
            choice = int(input(prompt))
            if choice > 0 and choice < 4:
                return choice
            else:
                print(bcolors.RED + "Invalid Choice!" + bcolors.RESET)
                choice = None
                continue
        except ValueError:
            print(bcolors.RED + "Invalid Choice!" + bcolors.RESET)
            choice = None
            continue
        except EOFError:
            exit()





    


if __name__ == "__main__":

    # First try to read the config file
    if not init_settings():
        create_config(bcolors.RED + "Could not read " + bcolors.GREEN + CONFIG + bcolors.RESET + " - fix it?")
    else:
        print(bcolors.GREEN + "OK" + bcolors.RESET)
        #create_config(bcolors.RED + "Could not read " + bcolors.GREEN + CONFIG + bcolors.RESET + " - fix it?")
    
    # Automatically set IPs if desired
    if OPTIONS.old_ip in auto_words:
        old_ip = get_current_ip()
    else:
        old_ip = OPTIONS.old_ip

    if OPTIONS.new_ip in auto_words:
        new_ip = IP
        OPTIONS.new_ip = IP
    else:
        new_ip = OPTIONS.new_ip

    print("old_ip is set to " + bcolors.GREEN + old_ip + bcolors.RESET)
    print("new_ip is set to " + bcolors.GREEN + new_ip + bcolors.RESET)
    #set_ip(old_ip, new_ip)
    #integrity_check()

    # TODO Implement main menu function
    # TODO Integrity check function *** - ok
    # TODO More options?

    selected = None
    choice = 0

    # gEtCh
    if OPTIONS.use_getch:
        if not check_getch():
            build_getch()
        selected = 1
    
    while (True):
        #cls()
        print_logo()
        

        if OPTIONS.use_getch:
            print(bcolors.YELLOW + "Use arrow keys to move" + bcolors.RESET)
        print_options(selected)
        if not OPTIONS.use_getch:
            choice = get_choice(bcolors.YELLOW + ">> " + bcolors.RESET)

        if OPTIONS.use_getch:
            selected = get_arrow_key(selected)

        if choice == 1:
            #set_ip("192.168.1.12", "VENUE.HOSTEDBY-SHOCKBYTE.COM")
            HTTPServer(('www.VENUE.HOSTEDBY-SHOCKBYTE.COM', 8080), Redirect).serve_forever() 
            exit()
        elif choice == 2:
            integrity_check()
            exit()
        elif choice == 3:
            create_config('Fix config File?')
            exit()

        # Got geTcHEd
        try:
            if selected[1] == 'ENTER':
                if selected[0] == 1:
                    set_ip(old_ip, new_ip)
                    #HTTPServer(('', 80), Redirect).serve_forever() 
                    exit()
                elif selected[0] == 2:
                    integrity_check()
                    exit()
                elif selected[0] == 3:
                    create_config('Fix config File?')
                    exit()
        except TypeError:
            continue


        

            
    #create_config('fix')
    #build_getch()
    """if check_getch():
        char = get_arrow_key()
        cls()
        print(char)
    else:
        build_getch()"""



