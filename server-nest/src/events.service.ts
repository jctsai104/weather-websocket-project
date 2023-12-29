/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ExternalApiService {
  async fetchData() {
    try {
      const response = await axios.get(
        'https://opendata.cwa.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-9834876D-639C-40B9-B12B-65544A0D61E0&format=JSON&StationId=467571'
      )
      return response;
    } catch (error) {
      // 處理錯誤...
      throw error;
    }
  }
}
