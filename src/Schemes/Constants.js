import { getValueFromLocalStorage } from "./LocalStore"

export const Apis = {

    // BASE_URL : "http://www.bizhawkzdemo.com/healthy-wealthy/mobileAPI/mobile_API.php",
    BASE_URL: "http://payfitclub.com/api/mobileAPI/mobile_API.php",
    TOKEN: "9WsUDzMDtXG93WMrTd",
    //TOKEN       : "SdbHDbPZ4wqMGvVG5V",
    sign_up_case_id: "1",
    login_case_id: "2",
    forgot_password_case_id: "3",
    view_profile_case_id: "4",
    update_profile_case_id: "5",
    change_password_case_id: "48",
    update_password_case_id: "6",
    social_sign_up_case_id: "7",
    about_us_case_id: "10",
    terms_case_id: "11",
    country_case_id: "12",
    insert_Walkning_case_id: "13",
    insert_Cycling_case_id: "14",  //goal_id instead of response
    insert_Running_case_id: "15",//goal_id instead of response
    start_goal_case_id: "16",//goal_id instead of response
    stop_goal_case_id: "17",
    rewards_case_id: "24",
    update_profile_pic_case_id: "18",
    get_smoker_drinker_ailment_data: "19",
    contact_case_id: "20",
    wallet_api_case_id: "22",
    redeem_dollars_case_id: "23",
    quotes_case_id: "25",
    activity_complete_case_id: "26",
    actvity_ongoing_status_case_id: "27",
    goal_point_case_id: "28",
    discard_goal_case_id: "29",
    activity_points_list_case_id: "30",
    actvity_incomplete_case_id: "31",
    privacy_policy_case_id: "32",
    how_it_works_case_id: "33",
    Blog_url: "http://www.solugo.in/blog-post/",
    Survey_Url: "https://sampoolish.com/tool/appgroups.php?userid:",
    Survey_list_Url: "https://sampoolish.com/api/survey_tabs.php?token:",
    Complete_Survey_Url: "https://sampoolish.com/tool/appcompletesurvey.php?userid:",
    categories_Url: "https://sampoolish.com/api/sensex_category.php",
    questions_Url: "https://sampoolish.com/api/sensex_question.php",
    personal_profile_save_id: "37",
    submit_answer_Url: "https://sampoolish.com/api/sensex_submit_question.php",
    Survey_history_Url: "https://sampoolish.com/tool/appcompletedsurveylist.php?userid:",
    Event_List_Url: "http://payfitclub.com/api/mobileAPI/mobile_API_BACKUP.php?",
    TERMS_OF_USE: 'http://payfitclub.com/api/mobileAPI/termsofuse.html',
    BLOG_WEBVIEW: 'https://www.google.com'
}

export const LocalStore = {
    'LOGIN_STATUS': 'isSignedIn',
    'USER_ID': 'user_id',
    'NAME': 'first_name'
}