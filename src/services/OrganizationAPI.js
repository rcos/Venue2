import API from '@/services/API'

export default {
    getOrganizations() {
        return API().get('organizations')
    },
    addOrganization(organization) {
        return API().post('organizations/add', {
            organization: organization // add our data to the request body
        });
    },
    getSection(id) {
        return API().get('organizations/edit/' + id);
    },
    updateOrganization(id, organization) {
        return API().post('organizations/update/' + id, {
            updated_organization: organization
        });
    },
    /*deleteSection(id) {
        return API().delete('organizations/delete/' + id)
    },*/
    getCourses(id) {
        return API().get('organizations/get_courses/' + id);
    },
    getUsers(id) {
        return API().get('organizations/get_users/' + id);
    },
    getAdmins(id) {
        return API().get('organizations/get_admins/' + id);
    },
    addAdmins(id, admins) {
        return API().post('courses/add_admins/' + id, {
            admins: admins
        });
    },
    addUsers(id, users) {
        return API().post('sections/add_users/' + id, {
            users: users
        })
    },
    addCourses(id, courses) {
        return API().post('sections/add_courses/' + id, {
            courses: courses
        })
    }
}