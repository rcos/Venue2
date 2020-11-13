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
      return API().delete('sections/delete/' + id)
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
        return API().post('courses/add_instructors/' + id, {
            admins: admins
        });
    },
    addUsers(id, users) {
        return API().post('sections/add_students/' + id, {
            users: users
        })
    },
    addCourses(id, courses) {
        return API().post('sections/add_tas/' + id, {
            courses: courses
        })
    }
}