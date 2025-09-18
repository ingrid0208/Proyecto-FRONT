import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentType, DocumentTypeDto } from '../../shared/Models/parameter/document-type.models';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {
  readonly endpoint = 'documentType';

  constructor(public genericService: ServiceGenericService) { }
}