import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  baseurl = environment.live_url;
  constructor(private http: HttpClient, private toastr: ToastrService) {}
  // Success Message
  showSuccess(message: any) {
    this.toastr.success(message);
  }
  // Error Message
  showError(message: any) {
    this.toastr.error(message);
  }
  // Warning Message
  showWarning(message: any) {
    this.toastr.warning(message);
  }

  // Gateway
  login(data: any) {
    return this.http.post(`${this.baseurl}/main/login/`, data);
  }
  register(data: any) {
    return this.http.post(`${this.baseurl}/main/register/`, data);
  }
  forgetPassword(data: any) {
    return this.http.post(`${this.baseurl}/main/Forgotpasswordsendotp/`, data);
  }
  verifyOtp(data: any) {
    return this.http.post(
      `${this.baseurl}/main/otpverificationforgotpassword/`,
      data
    );
  }
  changePassword(data: any) {
    return this.http.post(`${this.baseurl}/main/Forgotpasswordreset/`, data);
  }
  // Gateway

  // Admin/supervisor Project
  createProject(data: any) {
    return this.http.post(`${this.baseurl}/main/projects/`, data);
  }
  editProject(data: any) {
    return this.http.put(`${this.baseurl}/main/projects/`, data);
  }
  getProject(point: any, user: any, id: any, pageNumber: any, data: any,searchKey:any) {
    return this.http.get(
      `${this.baseurl}/main/${point}/?${user}=${id}&page_number=${pageNumber}&data_per_page=${data}&search_key=${searchKey}`
    );
  }
  getAllProject() {
    return this.http.get(`${this.baseurl}/main/projects/`);
  }
  getActiveProject(id: any) {
    return this.http.get(
      `${this.baseurl}/main/get_active_projects/?owner_id=${id}`
    );
  }
  getProjectId(id: any) {
    return this.http.get(`${this.baseurl}/main/projects/?id=${id}`);
  }
  deleteProject(id: any) {
    return this.http.delete(`${this.baseurl}/main/projects/?id=${id}`);
  }
  // Admin/supervisor Project
  // Admin/supervisor Bid Project
  createProjectBid(data: any) {
    return this.http.post(`${this.baseurl}/main/projectbid/`, data);
  }
  getBidProject(pageNumber: any, data: any, id: any, user: any,searchkey:any) {
    return this.http.get(
      `${this.baseurl}/main/projectbid/?page_number=${pageNumber}&data_per_page=${data}&${user}=${id}&search_key=${searchkey}`
    );
  }
  getAllBidProject() {
    return this.http.get(`${this.baseurl}/main/projectbid/`);
  }
  editProjectBid(data: any) {
    return this.http.put(`${this.baseurl}/main/projectbid/`, data);
  }
  getProjectBidId(id: any) {
    return this.http.get(`${this.baseurl}/main/projectbid/?id=${id}`);
  }
  deleteProjectBid(id: any) {
    return this.http.delete(`${this.baseurl}/main/projectbid/?id=${id}`);
  }
  dashBoard(id: any) {
    return this.http.get(`${this.baseurl}/main/dashboard/?user_id=${id}`);
  }

  closeProject(data: any) {
    return this.http.post(`${this.baseurl}/main/updateclosetaskstatus/`, data);
  }
  // Admin/supervisor Bid Project

  // Status
  getStatus() {
    return this.http.get(`${this.baseurl}/user/projectstatus/`);
  }
  // Status
  // Supervisor
  getSupervisor() {
    return this.http.get(`${this.baseurl}/main/get_supervisors/`);
  }
  getAccessSupervisor(id: any) {
    return this.http.get(
      `${this.baseurl}/main/get_access_supervisors/?project_id=${id}`
    );
  }
  // Status
  // Rate Card
  createRateCard(data: any) {
    return this.http.post(`${this.baseurl}/user/ratecard/`, data);
  }
  getRateCard(pageNumber: any, data: any) {
    return this.http.get(
      `${this.baseurl}/user/ratecard/?page_number=${pageNumber}&data_per_page=${data}`
    );
  }
  getAllRateCard() {
    return this.http.get(`${this.baseurl}/user/ratecard/`);
  }
  // Rate Card
  //Submittals
  getSubmittals(user: any, id: any, pageNumber: any, data: any,searchkey:any) {
    return this.http.get(
      `${this.baseurl}/main/submittalsbyowner_and_volunteer/?${user}=${id}&page_number=${pageNumber}&data_per_page=${data}&search_key=${searchkey}`
    );
  }
  getSubmittalsbyId(id: any) {
    return this.http.get(`${this.baseurl}/main/submittals/?project_id=${id}`);
  }
  getSubmittalsbyIdandPagination(id: any,searchkey:any) {
    return this.http.get(`${this.baseurl}/main/submittals/?project_id=${id}&search_key=${searchkey}`);
  }
  getAllSubmittals() {
    return this.http.get(`${this.baseurl}/main/submittals/`);
  }
  approveBidders(data: any) {
    return this.http.put(
      `${this.baseurl}/main/updatestudentbidapproval/`,
      data
    );
  }
  //Submittals
  //ProjectManagement
  getBidManagement(user: any, id: any, pageNumber: any, data: any,searchkey:any) {
    return this.http.get(
      `${this.baseurl}/main/bidprojectManagement/${user}/${id}/?page_number=${pageNumber}&data_per_page=${data}&search_key=${searchkey}`
    );
  }
  getAllProjectManagement() {
    return this.http.get(`${this.baseurl}/main/bidprojectManagement/`);
  }
  getTaskDetailsByProjectId(id: any, page: any, data: any, status: any) {
    return this.http.get(
      `${this.baseurl}/main/taskfiterbystatus/?page_number=${page}&data_per_page=${data}&project_id=${id}&task_status=${status}`
    );
  }
  approveTask(data: any) {
    return this.http.put(`${this.baseurl}/main/taskstatusapproval/`, data);
  }
  assignSupervisor(id: any, data: any) {
    return this.http.post(
      `${this.baseurl}/main/give_access_to_supervisors/${id}/`,
      data
    );
  }
  getRewardAdmin(id: any, page: any, pageSize: any,searchKey:any) {
    return this.http.get(
      `${this.baseurl}/main/getdetailrewards/?user_id=${id}&page_number=${page}&data_per_page=${pageSize}&search_key=${searchKey}`
    );
  }
  getRewardAdminbyTask(id: any, page: any, pageSize: any,searchKey:any) {
    return this.http.get(
      `${this.baseurl}/main/getdetailrewards/?project_id=${id}&page_number=${page}&data_per_page=${pageSize}&search_key=${searchKey}`
    );
  }
  //ProjectManagement

  //Student
  applyBid(data: any) {
    return this.http.put(
      `${this.baseurl}/main/updateprojectforstudents/`,
      data
    );
  }

  getApprovedProject(page: any, data: any, id: any, status: any,searchkey:any) {
    return this.http.get(
      `${this.baseurl}/main/studentmanagement/?page_number=${page}&data_per_page=${data}&user_id=${id}&status_approval=${status}&search_key=${searchkey}`
    );
  }

  createTaskByProjectId(data: any) {
    return this.http.post(`${this.baseurl}/main/taskdetail/`, data);
  }
  getTaskDetails(id: any) {
    return this.http.get(
      `${this.baseurl}/main/taskdetail/?page_number=1&data_per_page=5&id=${id}`
    );
  }
  getMonthDetails(id: any) {
    return this.http.get(
      `${this.baseurl}/main/getworking_list_month/?task_id=${id}`
    );
  }
  getTimeSheetDetails(id: any) {
    return this.http.get(
      `${this.baseurl}/main/taskdetail/?page_number=1&data_per_page=5&id=${id}`
    );
  }
  updateTaskByProjectId(data: any) {
    return this.http.put(`${this.baseurl}/main/taskdetail/`, data);
  }
  getTaskbyProjectId(pageNumber: any, data: any, id: any, user_id: any,searchkey:any) {
    return this.http.get(
      `${this.baseurl}/main/taskdetail/?page_number=${pageNumber}&data_per_page=${data}&project_id=${id}&user_id=${user_id}&search_key=${searchkey}`
    );
  }
  getProjectByUserId(pageNumber: any, data: any, id: any) {
    return this.http.get(
      `${this.baseurl}/main/projectbid/?volunteer_id=${id}&page_number=${pageNumber}&data_per_page=${data}`
    );
  }
  getProjectBidsByUserId(pageNumber: any, data: any, id: any,owner_id:any,location:any,searchkey:any) {
    return this.http.get(
      `${this.baseurl}/main/projectbid/?volunteer_id=${id}&page_number=${pageNumber}&data_per_page=${data}&project_owner=${owner_id}&location=${location}&search_key=${searchkey}`
    );
  }
  getRewardProject(user: any, pageNumber: any, data: any, id: any,searchkey:any) {
    return this.http.get(
      `${this.baseurl}/main/approvedprojecttask/?page_number=${pageNumber}&data_per_page=${data}&task_status=Accepted&${user}=${id}&search_key=${searchkey}`
    );
  }
  assignReward(data: any) {
    return this.http.put(`${this.baseurl}/main/upadtewalletbalance/`, data);
  }
  getRewardByProjectId(id: any) {
    return this.http.get(
      `${this.baseurl}/main/budgetamountallocation/?project_id=${id}`
    );
  }
  getReward(id: any, page: any, pageSize: any,searchKey:any) {
    return this.http.get(
      `${this.baseurl}/main/rewardbystudent/?page_number=${page}&data_per_page=${pageSize}&user_id=${id}&search_key=${searchKey}`
    );
  }
  getRewardByProjectIdStudent(
    projectId: any,
    id: any,
    page: any,
    pageSize: any,
    searchkey:any
  ) {
    return this.http.get(
      `${this.baseurl}/main/rewardbytask/?page_number=${page}&data_per_page=${pageSize}&project_id=${projectId}&rewarded_to_id=${id}&search_key=${searchkey}`
    );
  }
  getWalletAmount(id: any) {
    return this.http.get(
      `${this.baseurl}/main/getwalletamount/?rewarded_to=${id}`
    );
  }
  //Student

  private acceptTask = new Subject<any>();

  getUpdateTask = this.acceptTask.asObservable();
  updateTask(data: any) {
    this.acceptTask.next(data);
  }

  //  Super Admin
  getUser(page: any, pageSize: any,searchkey:any) {
    return this.http.get(
      `${this.baseurl}/main/customuser/?page_number=${page}&data_per_page=${pageSize}&search_key=${searchkey}`
    );
  }
  getRoleId() {
    return this.http.get(`${this.baseurl}/main/getrole/`);
  }
  createUser(data: any) {
    return this.http.post(`${this.baseurl}/main/customuser/`, data);
  }
  deleteUser(id: any) {
    return this.http.delete(`${this.baseurl}/main/customuser/${id}`);
  }
  //  Super Admin

  getCountries() {
    return this.http.get(`${this.baseurl}/main/countries/`);
  }

  createProfile(data: any) {
    return this.http.post(`${this.baseurl}/main/profile/`, data);
  }
  getProfile(id: any) {
    return this.http.get(`${this.baseurl}/main/profile/?id=${id}`);
  }
  editProfile(data: any) {
    return this.http.put(`${this.baseurl}/main/profile/`, data);
  }

  //Project Overview -Super Admin

  getAllProjectsSuperAdmin(page: any, pageSize: any,searchkey:any) {
    return this.http.get(
      `${this.baseurl}/main/getprojectdetails/?page_number=${page}&data_per_page=${pageSize}&search_key=${searchkey}`
    );
  }

  getProjectByIdSuperAdmin(id: any) {
    return this.http.get(`${this.baseurl}/main/getprojectdetails/?id=${id}`);
  }
  getProjectOwnerName(){
    return this.http.get(`${this.baseurl}/main/projectownerlist/`);
  }
}
