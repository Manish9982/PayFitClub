import { Apis, LocalStore } from "./Constants";
import { getValueFromLocalStorage } from "./LocalStore";
import { PostApiData } from "./PostApiData";

export function convertTimeStampToDate(inputDate) {
  const date = new Date(inputDate);
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

export function removeElementFromArray(arr, element) {
  return arr?.filter((el) => el !== element);
}

export function breakString(str, separator) {
  return str?.split(separator);
}

export function formatDate(timestamp) {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

export const throwUserID = async () => {
  const userId = await getValueFromLocalStorage(LocalStore.USER_ID)
  return userId
}

export const formatTimer = (seconds) => {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds % 60).padStart(2, '0');
  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

export function validateEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

export const updateGoalServiceWalking = async (goalId, time, steps, avgPace, calories, activity) => {
  var formdata = new FormData()
  formdata.append("token", Apis.TOKEN);
  formdata.append("caseid", Apis.stop_goal_case_id);
  formdata.append("goalid", goalId);
  formdata.append("time", time);
  formdata.append("steps", steps);
  formdata.append("avg_pace", avgPace);
  formdata.append("calories", calories);
  formdata.append("activity", activity);
  const result = await PostApiData(formdata)
  console.log('goal updated===>', result)
}

export const updateGoalServiceRunOrCycle = async (goalId, time, steps, avgPace, calories, activity) => {
  var formdata = new FormData()
  formdata.append("token", Apis.TOKEN);
  formdata.append("caseid", Apis.stop_goal_case_id);
  formdata.append("goalid", goalId);
  formdata.append("time", time);
  formdata.append("distance", steps);
  formdata.append("avg_pace", avgPace);
  formdata.append("calories", calories);
  formdata.append("activity", activity);
  const result = await PostApiData(formdata)
  console.log('goal updated===>', result)
}

export const getStepsDataForRunning = async () => {
  var formdata = new FormData()
  formdata.append("token", Apis.TOKEN);
  formdata.append("caseid", Apis.start_goal_case_id);
  formdata.append("userid", await throwUserID());
  formdata.append("goalid", goalId);
  formdata.append("activity", "Running");
  const result = await PostApiData(formdata)
}

export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = degToRad(lat2 - lat1);
  const dLon = degToRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degToRad(lat1)) * Math.cos(degToRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers

  return distance;
};

const degToRad = degrees => {
  return degrees * (Math.PI / 180);
};