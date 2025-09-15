import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DocumentType, DocumentTypeDto } from '../../shared/Models/parameter/document-type.models';
import { ServiceGenericService } from './servicesGeneric/service-generic.service';

@Injectable({
  providedIn: 'root'
})
export class DocumentTypeService {

  constructor(private genericService: ServiceGenericService) { }

  getDocumentTypes(): Observable<DocumentType[]> {
    return this.genericService.getAll<DocumentType>('documentType');
  }

  getDocumentTypeById(id: number): Observable<DocumentType> {
    return this.genericService.getById<DocumentType>('documentType', id);
  }

  createDocumentType(documentType: DocumentType): Observable<DocumentType> {
    return this.genericService.create<DocumentType>('documentType', documentType);
  }

  updateDocumentType(documentType: DocumentType): Observable<DocumentType> {
    return this.genericService.update<DocumentType>('documentType', documentType.id, documentType);
  }

  deleteDocumentType(id: number): Observable<any> {
    return this.genericService.delete('documentType', id);
  }
}