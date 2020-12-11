
<template>
    <div>
        <!-- Need to capture userid/docid/date/time at moment of acceptance somehow -->

        <form class="agreement-form" action="#" onsubmit="if(document.getElementById('agree').checked) { return true; } else { alert('Please indicate that you have read and agree to the Terms and Conditions and Privacy Policy'); return false; }">
            <input type="checkbox" name="checkbox" value="check" id="agree" /> I have read and agree to the Terms and Conditions and Privacy Policy
            <input type="submit" name="submit" value="submit" />
        </form>
    </div>
</template>

<!-- I Agree Checkbox by https://www.TermsFeed.com -->
<script type="text/javascript" src="//www.termsfeed.com/public/i-agree-checkbox/releases/1.0.0/i-agree-checkbox.js"></script>
<script type="text/javascript">
import AgreementAPI from '@/services/AgreementAPI.js'

export default {
    name: 'AgreementForm',
    data() {
        return {
            form: {
                user_id: '',
                doc_id: '',
                date: '',
                time: ''
            },
            show_not_accepted: false
        }
    },
    created() {
        document.addEventListener('DOMContentLoaded', function () {
            i_agree_checkbox.run({"palette":"light","terms_and_conditions_url":"","privacy_policy_url":"","privacy_policy_text_container_id":
                        "#user_i_agree_checkbox_privacy_policy_text_container","terms_and_conditions_text_container_id":"#user_i_agree_checkbox_terms_and_conditions_text_container",
                        "warning_dialog_text":"Warning: You must accept our terms in order to continue access to our site.","consent_to_agreements":
                        ["privacy_policy","terms_and_conditions"],"agreements_display_type":"full_text","checkbox_text_area_id":"#i_agree_checkbox_insertable_area","checkbox_text":
                        "By clicking submit you agree to our %PrivacyPolicy% and %TermsAndConditions%.","submit_button_id":"#submit_button","agree_button_text":"OK","close_button_text":"Cancel"});
        });
    },
    methods: {
        //are originally not called on: have to first figure out how to capture the data
        setUserId(user_id) {
            this.form.user_id = user_id
        },
        setDocId(doc_id) {
            this.form.doc_id = doc_id
        }
        //setDate
        //setTime
    }
}

</script>

<noscript>I Agree Checkbox by <a href="https://www.TermsFeed.com/i-agree-checkbox/" rel="nofollow noopener">TermsFeed.com</a></noscript>
<!-- End I Agree Checkbox -->

<!-- Want to implement: new user datatype that will hold date/version of agreement
if date/version does not match with current agreement version @ time of login, show agreement form 

Where: either show as user enters dashboard, or show during signup/login -->
