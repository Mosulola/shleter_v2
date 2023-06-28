import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';
import { FilterCheckBox } from '../interface/util';
@Injectable({
  providedIn: 'root'
})
export class RoomsService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  // ข้อมูลแสดงห้องตาม page และ limit
  getRoomsByPageAndLimit(page: any, limit: any) {
    return this.http.get(environment.API_URL + '/rooms?page=' + page + '&limit=' + limit);
  }

  // ข้อมูลการค้นหาห้องตาม page และ limit
  searchRoomsByTypeDataPageLimit(title: any, description: any, page: any, limit: any) {
    return this.http.get(environment.API_URL + '/rooms?search=' + title + '&keyword=' + description + '&page=' + page + '&limit=' + limit);
  }

  // ข้อมูลห้อง
  getRoomById(id: any) {
    return this.http.get(environment.API_URL + '/rooms/' + id);
  }

  getRoomByStatus(status: any, page: any, limit: any, type?: any, search?: any) {
    if (search) {
      return this.http.get(environment.API_URL + '/rooms/status/' + status + '?page=' + page + '&limit=' + limit + '&search=' + type + '&keyword=' + search);
    } else {
      return this.http.get(environment.API_URL + '/rooms/status/' + status + '?page=' + page + '&limit=' + limit);
    }
  }

  getRoomForViewLog(filter: FilterCheckBox) {
    return this.http.get(`${environment.API_URL}/rooms/status/${filter.status}?search=${filter.type}&keyword=${filter.keyword}&typeRoom=${filter.type_room}&page=${filter.page}&limit=${filter.limit}&roomAccuracy=${filter.roomAccuracy}&turnAccuracy=${filter.turnAccuracy}&postEdit=${filter.isPostEdit == null ? '' : filter.isPostEdit}`);
  }

  getStatusRoom() {
    return this.http.get(environment.API_URL + '/status');
  }

  getTypeRoom() {
    return this.http.get(`${environment.API_URL}/type`);
  }

  putTags(roomId: any, tag: any) {
    return this.http.put(environment.API_URL + '/rooms/' + roomId + '/tags/' + tag, undefined);
  }

  deleteTag(roomId: any, tag: any) {
    return this.http.delete(environment.API_URL + '/rooms/' + roomId + '/tags/' + tag);
  }

  getStatDashboard(filter: any) {
    return this.http.get(environment.API_URL + `/dashboard?monthAgo=${filter.statMonthAgo}`);
  }

  getStatusTypeAccuracy() {
    return this.http.get(`${environment.API_URL}/room_accuracy/type`);
  }
}
