import { Image, StyleSheet, ScrollView, TouchableOpacity, ImageBackground, Alert, Modal, useWindowDimensions } from 'react-native'
import React, { useState, useEffect } from 'react'
import TextInputMed from '../../Components/TextInputMed'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Spaces } from '../../Schemes/Spaces'
import ButtonLar from '../../Components/ButtonLar'
import TextInputCustomView from '../../Components/TextInputCustomView'
import DatePicker from 'react-native-date-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import { PostApiData } from '../../Schemes/PostApiData'
import TextInputWithMultipleOptions from '../../Components/TextInputWithMultipleOptions'
import { breakString, formatDate, throwUserID } from '../../Schemes/Utils'
import CustomLoader from '../../Components/CustomLoader'
import { Colors } from '../../Schemes/Colors'
import { Fonts } from '../../Schemes/Fonts'
import { Apis } from '../../Schemes/Constants'
import { LocalStore } from '../../Schemes/Constants'
import { getValueFromLocalStorage } from '../../Schemes/LocalStore'
import { Text } from 'react-native-paper'
import CamModal from '../../Components/CamModal'

const Profile = () => {

    const H = useWindowDimensions().height
    const W = useWindowDimensions().width

    useEffect(() => {
        getAilments()
        retrieveAnswers()
    }, [])

    const [loaderForInput, setLoaderForInput] = useState(false)
    const [name, setName] = useState('')
    const [gender, setGender] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDob] = useState(null)
    const [dobFlag, setDobFlag] = useState('')
    const [phone, setPhone] = useState('')
    const [zipCode, setZipCode] = useState('')
    const [height, setHeight] = useState('')
    const [weight, setWeight] = useState('')
    const [existingAilment, setExistingAilment] = useState('')
    const [existingAilmentFlag, setExistingAilmentFlag] = useState('')
    const [allergies, setAllergies] = useState('')
    const [smoking, setSmoking] = useState('')
    const [drinking, setDrinking] = useState('')
    const [doctorVisitFrequency, setDoctorVisitFrequency] = useState('')
    const [highestLevelOfEducation, setHighestLevelOfEducation] = useState('')
    const [relationshipStatus, setRelationshipStatus] = useState('')
    const [childrenUnderEighteen, setChildrenUnderEighteen] = useState('')
    ////////////////////////////////////////
    const [currentEmployeeStatus, setCurrentEmployeeStatus] = useState('')
    const [bestDescribesYourOrganisation, setBestDescribesYourOrganisation] = useState('')
    const [employeesWork, setEmployeesWork] = useState('')
    const [jobTitle, setJobTitle] = useState('')
    const [incomeBeforeTaxes, setIncomeBeforeTaxes] = useState('')
    const [race, setRace] = useState('')
    const [isHispanic, setIsHispanic] = useState('')
    const [departmentThatInfluencesYou, setDepartmentThatInfluencesYou] = useState('')
    const [annualRevenue, setAnnualRevenue] = useState('')
    /////////////////////////////////////
    const [genderModal, setGenderModal] = useState(false);
    const [openDobModal, setOpenDobModal] = useState(false);
    const [ailmentModal, setAilmentModal] = useState(false);
    const [dataForProfile, setDataForProfile] = useState(null)
    const [smokerModal, setSmokerModal] = useState(false)
    const [drinkingModal, setDrinkingModal] = useState(false)
    const [doctorVisitModal, setDoctorVisitModal] = useState(false)
    const [employeeStatusModal, setEmployeeStatusModal] = useState(false)
    const [organistaionDescriptionModal, setOrganistaionDescriptionModal] = useState(false)
    const [employeesWorkAtOrganistaionModal, setEmployeesWorkAtOrganistaionModal] = useState(false)
    const [jobTitleModal, setJobTitleModal] = useState(false)
    const [annualIncomeModal, setAnnualIncomeModal] = useState(false)
    const [raceModal, setRaceModal] = useState(false)
    const [hispanicModal, setHispanicModal] = useState(false)
    const [departmentThatInfluencesYouModal, setDepartmentThatInfluencesYouModal] = useState(false)
    const [annualRevenueModal, setAnnualRevenueModal] = useState(false)
    const [retrievedAnswers, setRetrievedAnswers] = useState(null)
    const [highestLevelOfEducationModal, setHighestLevelOfEducationModal] = useState(false)
    const [relationshipStatusModal, setRelationshipStatusModal] = useState(false)
    const [childrenUnderEighteenModal, setChildrenUnderEighteenModal] = useState(false)
    const [camVisible, setCamVisible] = useState(false)


    const presentDate = new Date()

    const launchCam = async () => {
        const pic = await launchCamera()
        console.log('pic from camera', pic)
    }

    const launchLibrary = async () => {
        const pic = await launchImageLibrary()
        console.log('pic from gallery', pic)
    }

    const onChangeName = (t) => {
        setName(t)
    }

    const onChangeEmail = (t) => {
        setEmail(t)
    }

    const onChangePhone = (t) => {
        setPhone(t)
    }
    const onChangeZipCode = (t) => {
        setZipCode(t)
    }
    const onChangeHeight = (t) => {
        setHeight(t)
    }
    const onChangeWeight = (t) => {
        setWeight(t)
    }
    const onPressGenderInput = () => {
        setGenderModal(true)
    }

    const onPressAilment = () => {
        setAilmentModal(true)
    }

    const openCamOrGallery = async () => {
        setCamVisible(true)
    }

    const onPressGenderItem = (t) => {
        setGender(t)
        setGenderModal(false)
    }

    const onPressAilmentItem = (t) => {
        setExistingAilment(t)
        setAilmentModal(false)
    }
    const onPressSmokerItem = (t) => {
        setSmoking(t)
        setSmokerModal(false)
    }
    const onPressDrinkingItem = (t) => {
        setDrinking(t)
        setDrinkingModal(false)
    }
    const onPressSmoking = () => {
        setSmokerModal(true)
    }
    const onPressDrinking = () => {
        setDrinkingModal(true)
    }

    const onChangeAllergies = (t) => {
        setAllergies(t)
    }

    const onPressDoctorVisitInput = () => {
        setDoctorVisitModal(true)
    }

    const onPressDoctorVisitItem = (t) => {
        setDoctorVisitFrequency(t)
        setDoctorVisitModal(false)
    }

    const onPressEmploymentItems = (t) => {
        setCurrentEmployeeStatus(t)
        setEmployeeStatusModal(false)
    }

    const onPressCurrentEmploymentStatus = () => {
        setEmployeeStatusModal(true)
    }

    const onPressOrganisationDescription = (t) => {
        setOrganistaionDescriptionModal(true)
    }
    const onPressOrganisationDescriptionItem = (t) => {
        setBestDescribesYourOrganisation(t)
        setOrganistaionDescriptionModal(false)
    }

    const onPressEmployeesWorkAtOrganisationInput = () => {
        setEmployeesWorkAtOrganistaionModal(true)
    }
    const onPressEmployeesWorkAtOrganisationItem = (t) => {
        setEmployeesWork(t)
        setEmployeesWorkAtOrganistaionModal(false)
    }
    const onPressJobTitleItem = (t) => {
        setJobTitle(t)
        setJobTitleModal(false)
    }

    const onPressJobTitleInput = () => {
        setJobTitleModal(true)
    }

    const onPressAnnualIncomeInput = () => {
        setAnnualIncomeModal(true)
    }

    const onPressAnnualIncomeItem = (t) => {
        setIncomeBeforeTaxes(t)
        setAnnualIncomeModal(false)
    }

    const onPressRaceInput = () => {
        setRaceModal(true)
    }

    const onPressRaceItem = (t) => {
        setRace(t)
        setRaceModal(false)
    }

    const onPressHispanicInput = () => {
        setHispanicModal(true)
    }

    const onPressHispanicItem = (t) => {
        setIsHispanic(t)
        setHispanicModal(false)
    }

    const onPressDepartmentInput = () => {
        setDepartmentThatInfluencesYouModal(true)
    }

    const onPressDepartmentItem = (t) => {
        setDepartmentThatInfluencesYou(t)
        setDepartmentThatInfluencesYouModal(false)
    }

    const onPressAnnualRevenueInput = () => {
        setAnnualRevenueModal(true)
    }

    const onPressAnnualRevenueItem = (t) => {
        setAnnualRevenue(t)
        setAnnualRevenueModal(false)
    }
    const onPressHighestLevelOfEducationInput = () => {
        setHighestLevelOfEducationModal(true)
    }
    const onPressHighestLevelOfEducationItem = (t) => {
        setHighestLevelOfEducation(t)
        setHighestLevelOfEducationModal(false)
    }

    const onPressRelationShipStatusInput = () => {
        setRelationshipStatusModal(true)
    }
    const onPressRelationShipStatusItem = (t) => {
        setRelationshipStatus(t)
        setRelationshipStatusModal(false)
    }

    const onPressChildrenUnderEighteenInput = () => {
        setChildrenUnderEighteenModal(true)
    }
    const onPressChildrenUnderEighteenItem = (t) => {
        setChildrenUnderEighteen(t)
        setChildrenUnderEighteenModal(false)
    }

    const getAilments = async () => {
        var formdata = new FormData
        formdata.append("token", "9WsUDzMDtXG93WMrTd");
        formdata.append("caseid", Apis.get_smoker_drinker_ailment_data);
        formdata.append("userid", await throwUserID());
        const result = await PostApiData(formdata)
        if (result?.status) {
            setDataForProfile(result)
        }
    }

    const onCancelPressCam = () => {
        setCamVisible(false)
    }

    const retrieveAnswers = async () => {
        const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
        setLoaderForInput(true)
        var formdata = new FormData
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.view_profile_case_id);
        formdata.append("userids", userId);
        const result = await PostApiData(formdata)
        if (result?.status) {
            setRetrievedAnswers(result)
            setName(result?.response?.fname)
            setGender(result?.response?.gender)
            setEmail(result?.response?.email)
            setDobFlag(result?.response?.dob)
            setPhone(result?.response?.phone)
            setZipCode(result?.response?.zipcode)
            setHeight(result?.response?.height)
            setWeight(result?.response?.weight)
            setExistingAilment(result?.response?.existing_ailment)
            setExistingAilmentFlag(result?.response?.ailment_others)
            setAllergies(result?.response?.allergies)
            setSmoking(result?.response?.smoker)
            setDrinking(result?.response?.drink)
            setDoctorVisitFrequency(result?.response?.visit_doctor)
            setHighestLevelOfEducation(result?.response?.education)
            setRelationshipStatus(result?.response?.relationship_status)
            setChildrenUnderEighteen(result?.response?.child_have_under_18)
            setCurrentEmployeeStatus(result?.response?.employment_status)
            setBestDescribesYourOrganisation(result?.response?.about_organization)
            setEmployeesWork(result?.response?.total_employees)
            setJobTitle(result?.response?.job_title_summary)
            setIncomeBeforeTaxes(result?.response?.annual_income)
            setRace(result?.response?.race)
            setIsHispanic(result?.response?.are_you)
            setDepartmentThatInfluencesYou(result?.response?.dept)
            setAnnualRevenue(result?.response?.annual_revenue)
        }
        setLoaderForInput(false)
    }

    const onPressSaveProfessionalInfo = async () => {
        const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.update_profile_case_id);
        formdata.append("userids", userId);
        formdata.append("employment_status", currentEmployeeStatus);
        formdata.append("about_organization", bestDescribesYourOrganisation);
        formdata.append("total_employees", employeesWork);
        formdata.append("job_title_summary", jobTitle);
        formdata.append("annual_income", incomeBeforeTaxes);
        formdata.append("race", race);
        formdata.append("are_you", isHispanic);
        formdata.append("dept", departmentThatInfluencesYou);
        formdata.append("annual_revenue", annualRevenue);
        const result = await PostApiData(formdata)
        if (result?.status) {
            Alert.alert('Success', result?.message)
        }
        else {
            Alert.alert('Error', result?.message)
        }
    }

    const onPressPersonalInfoSave = async () => {
        setLoaderForInput(true)
        const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
        var formdata = new FormData()
        formdata.append("token", Apis.TOKEN);
        formdata.append("caseid", Apis.personal_profile_save_id);
        formdata.append("userids", userId);
        formdata.append("fname", name);
        formdata.append("lname", '');
        formdata.append("dob", dobFlag);
        formdata.append("phone", phone);
        formdata.append("zipcode", zipCode);
        formdata.append("email", email);
        formdata.append("height", height);
        formdata.append("weight", weight);
        formdata.append("gender", gender);
        formdata.append("drink", drinking);
        formdata.append("smoker", smoking);
        formdata.append("allergies", allergies);
        formdata.append("existing_ailment", existingAilment);
        formdata.append("other_ailment", existingAilmentFlag);
        formdata.append("visit_doctor", doctorVisitFrequency);
        formdata.append("education", highestLevelOfEducation);
        formdata.append("relationship_status", relationshipStatus);
        formdata.append("child_have_under_18", childrenUnderEighteen);
        const result = await PostApiData(formdata)
        if (result?.status) {
            Alert.alert('Success', result?.message)
        }
        else {
            Alert.alert('Error', result?.message)
        }
        setLoaderForInput(false)
    }

    var genderOptions = [
        {
            name: 'Male'
        },
        {
            name: 'Female'
        },
        {
            name: 'Other'
        }
    ]

    var educationLevel = [
        {
            name: "High school or equivalent"
        },
        {
            name: "Technical or occupational"
        },
        {
            name: "Associate degree"
        },
        {
            name: 'Some college coursework completed'
        },
        {
            name: "Bachelor's degree"
        },
        {
            name: "Master's degree"
        },
        {
            name: "Doctorate."
        },
        {
            name: "Professional"
        },
        {
            name: "None of the above"
        },
        {
            name: "Prefer not to answer"
        }
    ]

    var relationshipStatusOptions = [
        {
            name: "Married"
        },
        {
            name: "Unmarried"
        },
        {
            name: "Prefer not to answer"
        }
    ]

    var childrenUnderEighteenOptions = [
        {
            name: 'One'
        },
        {
            name: 'Two'
        },
        {
            name: 'More then two'
        },
        {
            name: 'None'
        },
        {
            name: 'Prefer not to answer'
        }
    ]


    return (
        loaderForInput
            ?
            <CustomLoader />
            :
            <KeyboardAwareScrollView>
                <ImageBackground
                    style={[styles.primaryContainer]}
                    source={require('../../Assets/Images/profile_background.png')} >
                    <CamModal
                        visible={camVisible}
                        onCancelPress={onCancelPressCam}
                        launchGallery={launchLibrary}
                        launchCam={launchCam}
                    />
                    <ScrollView contentContainerStyle={styles.scrollContainer}>
                        <TouchableOpacity
                            onPress={openCamOrGallery}
                            style={styles.containerProfilePic}>
                            <Image
                                style={styles.profilePic}
                                source={require('../../Assets/Images/user_name.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.headingText}>Personal Details</Text>
                        <TextInputMed
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            label={'Name'}
                            customIconSource={require('../../Assets/Images/profile.png')}
                            onChangeText={onChangeName}
                            value={name}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            visible={genderModal}
                            onPressOption={onPressGenderItem}
                            options={genderOptions}
                            onPressInputCustomView={onPressGenderInput}
                            label={'Gender'}
                            customIconSource={require('../../Assets/Images/gender.png')}
                            value={gender}
                        />
                        <TextInputMed
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            label={'Email'}
                            customIconSource={require('../../Assets/Images/email_ic.png')}
                            value={email}
                            onChangeText={onChangeEmail}
                        />
                        <TextInputCustomView
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            value={dobFlag}
                            onPressInputCustomView={() => { setOpenDobModal(true) }}
                            label={'DOB'}
                            customIconSource={require('../../Assets/Images/dob_ic.png')}
                        />
                        <DatePicker
                            mode='date'
                            maximumDate={presentDate}
                            modal
                            open={openDobModal}
                            date={dob || presentDate}
                            onConfirm={(date) => {
                                setOpenDobModal(false)
                                setDob(date)
                                setDobFlag(formatDate(date))
                            }}
                            onCancel={() => {
                                setOpenDobModal(false)
                            }}
                        />
                        <TextInputMed
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            maxLength={10}
                            label={'Phone'}
                            iconName={'phone'}
                            value={phone}
                            onChangeText={onChangePhone}
                        />
                        <TextInputMed
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            label={'Zip Code'}
                            customIconSource={require('../../Assets/Images/zip_ic.png')}
                            value={zipCode}
                            onChangeText={onChangeZipCode}
                        />
                        <TextInputMed
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            label={'Height (in Cms)'}
                            customIconSource={require('../../Assets/Images/height_ic.png')}
                            value={height}
                            onChangeText={onChangeHeight}
                        />
                        <TextInputMed
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            label={'Weight (in Kg)'}
                            customIconSource={require('../../Assets/Images/weight_ic.png')}
                            value={weight}
                            onChangeText={onChangeWeight}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            options={dataForProfile?.response?.ailment}
                            onPressInputCustomView={onPressAilment}
                            visible={ailmentModal}
                            onPressOption={onPressAilmentItem}
                            label={'Existing ailment (if any)'}
                            value={existingAilment}
                            customIconSource={require('../../Assets/Images/ailment_ic.png')}
                        />
                        {
                            existingAilment == 'Other' &&
                            <TextInputMed
                                editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                                label={'Existing ailment (other)'}
                                value={existingAilmentFlag}
                                customIconSource={require('../../Assets/Images/ailment_ic.png')}
                            />
                        }
                        <TextInputMed
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            label={'Allergies (if any)'}
                            customIconSource={require('../../Assets/Images/allergie_ic.png')}
                            value={allergies}
                            onChangeText={(t) => onChangeAllergies(t)}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            visible={smokerModal}
                            label={'Smoking habit'}
                            options={dataForProfile?.response?.smoker}
                            onPressOption={onPressSmokerItem}
                            onPressInputCustomView={onPressSmoking}
                            value={smoking}
                            customIconSource={require('../../Assets/Images/smoker_ic.png')}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            visible={drinkingModal}
                            label={'Drinking habit'}
                            options={dataForProfile?.response?.drinker}
                            value={drinking}
                            onPressOption={onPressDrinkingItem}
                            onPressInputCustomView={onPressDrinking}
                            customIconSource={require('../../Assets/Images/drinking_ic.png')}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            visible={doctorVisitModal}
                            options={dataForProfile?.response?.doctor}
                            onPressInputCustomView={onPressDoctorVisitInput}
                            label={'How often do you visit doctors?'}
                            customIconSource={require('../../Assets/Images/doctor_ic.png')}
                            onPressOption={onPressDoctorVisitItem}
                            value={doctorVisitFrequency}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            visible={highestLevelOfEducationModal}
                            options={educationLevel}
                            onPressInputCustomView={onPressHighestLevelOfEducationInput}
                            onPressOption={onPressHighestLevelOfEducationItem}
                            value={highestLevelOfEducation}
                            label={'Highest level of education?'}
                            customIconSource={require('../../Assets/Images/highest_education.png')}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            options={relationshipStatusOptions}
                            onPressInputCustomView={onPressRelationShipStatusInput}
                            visible={relationshipStatusModal}
                            onPressOption={onPressRelationShipStatusItem}
                            label={'Relationship status'}
                            value={relationshipStatus}
                            customIconSource={require('../../Assets/Images/relationship_status.png')}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.personalprofile_updated !== 'No'}
                            options={childrenUnderEighteenOptions}
                            value={childrenUnderEighteen}
                            visible={childrenUnderEighteenModal}
                            onPressInputCustomView={onPressChildrenUnderEighteenInput}
                            onPressOption={onPressChildrenUnderEighteenItem}
                            label={'Children you have under age 18?'}
                            customIconSource={require('../../Assets/Images/under_age.png')}
                        />
                        {retrievedAnswers?.response?.personalprofile_updated == 'No' &&
                            <Text style={[styles.infoFont, Fonts.mediumBold]}>*Personal profile can only be update after 6 months</Text>}
                        {retrievedAnswers?.response?.profile_updated !== 'No' &&
                            <ButtonLar
                                onPressButtonLar={onPressPersonalInfoSave}
                                title={'Save'}
                                style={styles.buttonStyle}
                            />}
                        <Text style={styles.headingText}>Professional Details</Text>
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.profile_updated !== 'No'}
                            hasKey={false}
                            visible={employeeStatusModal}
                            onPressOption={onPressEmploymentItems}
                            onPressInputCustomView={onPressCurrentEmploymentStatus}
                            options={breakString(dataForProfile?.response?.questions[0]?.options, '~^')}
                            label={'Your current employee status?'}
                            value={currentEmployeeStatus}
                            customIconSource={require('../../Assets/Images/employment_status_med.png')}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.profile_updated !== 'No'}
                            hasKey={false}
                            visible={organistaionDescriptionModal}
                            options={breakString(dataForProfile?.response?.questions[1]?.options, '~^')}
                            label={'Best describes your organisation.'}
                            value={bestDescribesYourOrganisation}
                            customIconSource={require('../../Assets/Images/organization_med.png')}
                            onPressInputCustomView={onPressOrganisationDescription}
                            onPressOption={onPressOrganisationDescriptionItem}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.profile_updated !== 'No'}
                            hasKey={false}
                            visible={employeesWorkAtOrganistaionModal}
                            value={employeesWork}
                            label={'Employees work at your organisation'}
                            customIconSource={require('../../Assets/Images/employees_work_organization.png')}
                            onPressInputCustomView={onPressEmployeesWorkAtOrganisationInput}
                            onPressOption={onPressEmployeesWorkAtOrganisationItem}
                            options={breakString(dataForProfile?.response?.questions[2]?.options, '~^')}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.profile_updated !== 'No'}
                            hasKey={false}
                            visible={jobTitleModal}
                            value={jobTitle}
                            options={breakString(dataForProfile?.response?.questions[3]?.options, '~^')}
                            label={'Your job title, level or responsibility.'}
                            customIconSource={require('../../Assets/Images/job_title.png')}
                            onPressInputCustomView={onPressJobTitleInput}
                            onPressOption={onPressJobTitleItem}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.profile_updated !== 'No'}
                            hasKey={false}
                            visible={annualIncomeModal}
                            value={incomeBeforeTaxes}
                            options={breakString(dataForProfile?.response?.questions[4]?.options, '~^')}
                            label={'Annual household income before taxes'}
                            customIconSource={require('../../Assets/Images/annual_taxes.png')}
                            onPressOption={onPressAnnualIncomeItem}
                            onPressInputCustomView={onPressAnnualIncomeInput}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.profile_updated !== 'No'}
                            hasKey={false}
                            label={'What is your race?'}
                            value={race}
                            visible={raceModal}
                            options={breakString(dataForProfile?.response?.questions[5]?.options, '~^')}
                            customIconSource={require('../../Assets/Images/your_race.png')}
                            onPressInputCustomView={onPressRaceInput}
                            onPressOption={onPressRaceItem}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.profile_updated !== 'No'}
                            hasKey={false}
                            value={isHispanic}
                            options={breakString(dataForProfile?.response?.questions[6]?.options, '~^')}
                            visible={hispanicModal}
                            onPressInputCustomView={onPressHispanicInput}
                            onPressOption={onPressHispanicItem}
                            label={'Are you of hispanic, latino or spanish organisation?'}
                            customIconSource={require('../../Assets/Images/hispanic_spanish.png')}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.profile_updated !== 'No'}
                            hasKey={false}
                            value={departmentThatInfluencesYou}
                            visible={departmentThatInfluencesYouModal}
                            options={breakString(dataForProfile?.response?.questions[7]?.options, '~^')}
                            label={'Department/Product influence you.'}
                            customIconSource={require('../../Assets/Images/department_influence.png')}
                            onPressInputCustomView={onPressDepartmentInput}
                            onPressOption={onPressDepartmentItem}
                        />
                        <TextInputWithMultipleOptions
                            editable={retrievedAnswers?.response?.profile_updated !== 'No'}
                            hasKey={false}
                            value={annualRevenue}
                            visible={annualRevenueModal}
                            options={breakString(dataForProfile?.response?.questions[8]?.options, '~^')}
                            label={'Annual revenue of your organisation'}
                            customIconSource={require('../../Assets/Images/annual_revenue.png')}
                            onPressOption={onPressAnnualRevenueItem}
                            onPressInputCustomView={onPressAnnualRevenueInput}
                        />
                        {retrievedAnswers?.response?.profile_updated == 'No' &&
                            <Text style={[styles.infoFont, Fonts.mediumBold]}>*Profile can only be update after 6 months</Text>}
                        {
                            retrievedAnswers?.response?.profile_updated !== 'No' &&
                            <ButtonLar
                                onPressButtonLar={onPressSaveProfessionalInfo}
                                title={'Save'}
                                style={styles.buttonStyle}
                            />
                        }
                    </ScrollView>
                </ImageBackground>
            </KeyboardAwareScrollView>

    )
}

const styles = StyleSheet.create({
    primaryContainer:
    {
        flex: 1
    },
    imageBg:
    {
        resizeMode: 'cover',
        position: 'absolute',
        zIndex: -1
    },
    headingText:
    {
        padding: Spaces.med,
        textDecorationLine: 'underline',
        textAlign: 'center'
    },
    profilePic:
    {
        width: 80,
        alignSelf: 'center',
        marginVertical: Spaces.med,
        resizeMode: 'contain'
    },
    containerProfilePic:
    {
        alignSelf: 'center'
    },
    scrollContainer:
    {
    },
    buttonStyle:
    {
        margin: Spaces.sm
    },
    horizontalContainer:
    {
        flexDirection: 'row',
        alignItems: 'center'
    },
    ailmentItems:
    {
        width: '90%'
    },
    infoFont:
    {
        color: Colors.primary,
        textAlign: 'center',
        margin: Spaces.med
    }
})

export default Profile