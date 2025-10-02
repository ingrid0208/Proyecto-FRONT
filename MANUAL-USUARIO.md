# Manual de Usuario - Sistema de Gestión de Multas Ciudadanas
## Versión 1.0

---

## Información del Documento

**Sistema:** Sistema de Gestión de Multas Ciudadanas y Acuerdos de Pago
**Versión:** 1.0.0
**Tecnología:** Angular 19
**Fecha de actualización:** Octubre 2025

---

## Tabla de Contenidos

1. [Introducción](#1-introducción)
2. [Requisitos del Sistema](#2-requisitos-del-sistema)
3. [Acceso al Sistema](#3-acceso-al-sistema)
4. [Roles y Permisos](#4-roles-y-permisos)
5. [Funcionalidades del Sistema](#5-funcionalidades-del-sistema)
6. [Gestión de Multas Ciudadanas](#6-gestión-de-multas-ciudadanas)
7. [Acuerdos de Pago](#7-acuerdos-de-pago)
8. [Administración](#8-administración)
9. [Perfil de Usuario](#9-perfil-de-usuario)
10. [Preguntas Frecuentes](#10-preguntas-frecuentes)
11. [Soporte Técnico](#11-soporte-técnico)

---

## 1. Introducción

### 1.1 ¿Qué es el Sistema de Gestión de Multas Ciudadanas?

El Sistema de Gestión de Multas Ciudadanas es una aplicación web diseñada para facilitar la administración de sanciones por convivencia, comercio, espacio público y otras infracciones ciudadanas. Permite a los usuarios consultar sus multas, generar acuerdos de pago, recibir notificaciones y realizar seguimiento de su estado.

### 1.2 Propósito de este Manual

Este manual proporciona una guía completa para utilizar todas las funcionalidades del sistema, desde el registro hasta la gestión avanzada de multas y pagos.

### 1.3 Características Principales

- **Consulta de multas ciudadanas** por documento de identificación
- **Notificaciones** de multas pendientes
- **Acuerdos de pago** personalizados
- **Gestión de usuarios** y roles
- **Administración** de tipos de multas
- **Reportes** y estadísticas

---

## 2. Requisitos del Sistema

### 2.1 Navegadores Compatibles

El sistema funciona óptimamente en:

- **Google Chrome** (versión 90 o superior) - Recomendado
- **Mozilla Firefox** (versión 88 o superior)
- **Microsoft Edge** (versión 90 o superior)


### 2.2 Requisitos de Hardware

- **Procesador:** Dual Core 2.0 GHz o superior
- **Memoria RAM:** Mínimo 4 GB
- **Resolución de pantalla:** 1366x768 o superior
- **Conexión a Internet:** Banda ancha (mínimo 2 Mbps)

### 2.3 Requisitos de Software

- Sistema operativo actualizado (Windows 10+, macOS 10.15+, Linux)
- JavaScript habilitado en el navegador
- Cookies habilitadas

---

## 3. Acceso al Sistema

### 3.1 Pantalla de Inicio

Al acceder al sistema, será dirigido a la pantalla de inicio donde encontrará:

- Información general del sistema
- Botón **"Ingresar"** para usuarios registrados
- Opción de **"Registrarse"** para nuevos usuarios
- Opción de **"Identificación"** para consultas rápidas

**URL de acceso:** `[http://localhost:4200]`

---

### 3.2 Registro de Nuevo Usuario

#### Paso 1: Acceder al Formulario de Registro

1. Haga clic en el botón **"Registrarse"** en la página de inicio
2. Complete el formulario con la siguiente información:

#### Paso 2: Datos Requeridos

**Información Personal:**
- **Nombre completo**
- **Tipo de documento:** CC, CE, TI, Pasaporte
- **Número de documento**
- **Correo electrónico** (será su usuario)
- **Teléfono**
- **Género**
- **Ciudad**
- **Dirección**

**Credenciales de Acceso:**
- **Correo electrónico:** Debe ser válido y único
- **Contraseña:** Mínimo 6 caracteres con una letra mayuscula y un cararcter especial 
- **Confirmar contraseña:** Debe coincidir con la anterior

#### Paso 3: Validación de Correo

1. Después de registrarse, recibirá un correo de verificación
2. Revise su bandeja de entrada (o carpeta de spam)
3. Haga clic en el enlace de verificación
4. Será redirigido para ingresar el código de verificación
5. Ingrese el código recibido por correo
6. Su cuenta quedará activada

**Nota importante:** Si no recibe el correo en 10 minutos, puede solicitar el reenvío.

---

### 3.3 Inicio de Sesión

#### Proceso de Login

**Paso 1: Acceder a la Pantalla de Login**
1. Haga clic en **"Ingresar"** desde la página de inicio
2. Ingrese sus credenciales:
   - **Correo electrónico**
   - **Contraseña**

**Paso 2: Autenticación**
1. El sistema validará sus credenciales
2. Si son correctas, será redirigido al panel principal
3. Si son incorrectas, recibirá un mensaje de error

**Paso 3: Recuperación de Contraseña**

Si olvidó su contraseña:
1. Haga clic en **"¿Olvidó su contraseña?"**
2. Ingrese su correo electrónico registrado
3. Recibirá un enlace de recuperación
4. Siga las instrucciones del correo
5. Establezca una nueva contraseña

---

### 3.4 Consulta Sin Registro

Para consultas rápidas sin registro:

1. En la página de inicio, seleccione **"Identificación"**
2. Ingrese su número de documento
3. Seleccione el tipo de documento
4. Haga clic en **"Consultar"**
5. Verá sus multas asociadas (si las hay)

**Limitaciones de la consulta sin registro:**
- Solo puede ver información básica de multas
- No puede generar acuerdos de pago
- No recibe notificaciones
- No puede acceder al historial completo

---

## 4. Roles y Permisos

### 4.1 Roles del Sistema

El sistema cuenta con diferentes niveles de acceso:

#### A. Usuario  Inspectora 
**Permisos:**
- Consultar sus propias multas
- Generar acuerdos de pago
- Ver notificaciones personales
- Actualizar su perfil


#### B. Usuario Infractor 
**permisos:**
- Puede consultar sus infraciones y la de terceros si cuenta con el numero de documento 
**Permisos adicionales:**
- Anexar nuevas multas
- Consultar multas de otros usuarios
- Generar reportes básicos
- Gestionar notificaciones

#### C. Usuario Administrador
**Permisos heredados:** Todos los anteriores

**Permisos adicionales:**
- Gestión completa de usuarios
- Administración de roles y permisos
- Configuración de tipos de multas
- Administración de parámetros del sistema
- Gestión de departamentos y municipios
- Acceso a reportes avanzados
- Configuración de frecuencias de pago

---

### 4.2 Asignación de Roles

Los roles son asignados por un administrador del sistema:

1. Los nuevos usuarios se registran como **Usuario Ciudadano** por defecto
2. Un administrador puede elevar privilegios según las necesidades
3. Los cambios de rol requieren aprobación administrativa
4. Los permisos se aplican inmediatamente después de la asignación

---

## 5. Funcionalidades del Sistema

### 5.1 Panel Principal

Una vez autenticado, accederá al panel principal con:

**Barra de Navegación Superior:**
- Logo del sistema
- Menú de navegación
- Icono de notificaciones
- Perfil de usuario
- Botón de cerrar sesión

**Menú Lateral:**
- **Inicio:** Dashboard principal
- **Consultar/Ingresar:** Búsqueda de multas
- **Notificaciones:** Avisos de multas pendientes
- **Acuerdos de Pago:** Gestión de convenios
- **Tipos de Multas:** Catálogo de infracciones
- **Anexar Multas:** (Solo operadores/admin)
- **Administración:** (Solo administradores)

**Área de Contenido:**
- Información principal según la sección seleccionada
- Gráficos y estadísticas (en dashboard)
- Formularios y tablas según corresponda

---

### 5.2 Dashboard Principal

El dashboard muestra:

**Resumen de Estado:**
- Total de multas activas
- Multas pendientes de pago
- Acuerdos de pago vigentes
- Próximos vencimientos

**Gráficos Visuales:**
- Estado de multas (gráfico de torta)
- Histórico de pagos (gráfico de barras)
- Tendencias mensuales

**Acciones Rápidas:**
- Consultar multas
- Generar acuerdo de pago
- Actualizar perfil

---

## 6. Gestión de Multas Ciudadanas

### 6.1 Consultar Multas

#### Opción 1: Consulta por Usuario Autenticado

**Paso 1: Acceder al Módulo**
1. En el menú lateral, seleccione **"Consultar/Ingresar"**
2. Sus multas se mostrarán automáticamente

**Paso 2: Visualizar Información**

Cada multa muestra:
- **Número de acto administrativo**
- **Fecha de la infracción**
- **Tipo de infracción ciudadana**
- **Valor de la multa**
- **Estado:** Pendiente, Pagada, En Acuerdo, Vencida
- **Acciones disponibles**

**Paso 3: Filtros y Búsqueda**

Puede filtrar por:
- Estado de la multa
- Rango de fechas
- Tipo de infracción
- Valor (rango)

#### Opción 2: Consulta por Identificación (Operadores/Admin)

**Paso 1: Ingresar Datos**
1. Seleccione **"Consultar/Ingresar"**
2. En el campo de búsqueda, ingrese:
   - Número de documento
   - Tipo de documento
3. Haga clic en **"Buscar"**

**Paso 2: Ver Resultados**
- Se mostrarán todas las multas ciudadanas asociadas al documento
- Puede realizar las mismas acciones que en su consulta personal

---

### 6.2 Detalle de Multa Ciudadana

Al hacer clic en una multa ciudadana específica, verá:

**Información General:**
- Número de acto administrativo
- Fecha y hora de la infracción
- Lugar de la infracción (dirección)
- Autoridad que impuso la multa

**Detalles Legales:**
- Artículo o norma infringida
- Descripción de la infracción ciudadana
- Valor original
- Intereses acumulados (si aplica)
- Descuentos disponibles

**Estado y Acciones:**
- Estado actual
- Fecha de vencimiento
- Opciones de pago
- Descargar resolución (PDF)
- Generar acuerdo de pago

---

### 6.3 Notificaciones de Multas

#### Visualizar Notificaciones

**Paso 1: Acceder al Módulo**
1. Seleccione **"Notificaciones"** en el menú lateral
2. O haga clic en el icono de campana en la barra superior

**Paso 2: Lista de Notificaciones**

Verá notificaciones sobre:
- Nuevas multas registradas
- Vencimientos próximos
- Cuotas de acuerdos pendientes
- Cambios de estado
- Recordatorios de pago

**Paso 3: Gestionar Notificaciones**

Para cada notificación puede:
- **Leer:** Marca como leída
- **Ver detalle:** Accede a la información completa
- **Eliminar:** Quita la notificación
- **Ir a la multa:** Acceso directo a la multa relacionada

#### Configuración de Notificaciones

En su perfil puede configurar:
- Notificaciones por correo electrónico
- Frecuencia de recordatorios
- Tipos de notificaciones que desea recibir

---

### 6.4 Tipos de Multas Ciudadanas (Catálogo)

#### Consultar Catálogo

**Paso 1: Acceder al Módulo**
1. Seleccione **"Tipos de Multas"** en el menú

**Paso 2: Explorar Catálogo**

El catálogo muestra:
- **Código de la infracción ciudadana**
- **Descripción detallada**
- **Categoría:** Leve, Grave, Muy Grave
- **Valor en SMMLV** (Salarios Mínimos)
- **Artículo o norma**

**Paso 3: Búsqueda**

Puede buscar por:
- Código de infracción
- Palabra clave en descripción
- Categoría
- Rango de valor

#### Información Adicional

Cada tipo de multa incluye:
- **Normativa aplicable**
- **Descuentos por pronto pago**
- **Plazo para acuerdos de pago**
- **Consecuencias adicionales**

---

### 6.5 Anexar Multas Ciudadanas (Solo Operadores/Admin)

#### Proceso de Carga

**Paso 1: Acceder al Módulo**
1. Seleccione **"Anexar Multas"** en el menú

**Paso 2: Seleccionar Método**

**Opción A: Ingreso Individual**
1. Complete el formulario:
   - Número de acto administrativo
   - Tipo de infracción ciudadana
   - Fecha y hora
   - Lugar de la infracción
   - Documento del infractor
   - Valor de la multa
   - Observaciones

2. Adjunte documentos:
   - Resolución o acto administrativo
   - Evidencias fotográficas
   - Documentos adicionales

3. Haga clic en **"Guardar"**

**Opción B: Carga Masiva (Excel/CSV)**
1. Descargue la plantilla Excel
2. Complete la información según el formato
3. Cargue el archivo
4. El sistema validará los datos
5. Revise el resumen de importación
6. Confirme la carga

**Paso 3: Validación**
- El sistema verificará:
  - Formato de datos
  - Duplicados
   - Existencia de tipos de infracción ciudadana
  - Validez de documentos

**Paso 4: Confirmación**
- Las multas quedarán registradas
- Se enviarán notificaciones automáticas
   - Se generarán los actos administrativos

---

## 7. Acuerdos de Pago

### 7.1 Generar Acuerdo de Pago

#### Requisitos Previos

Para generar un acuerdo de pago necesita:
- Tener al menos una multa pendiente
- No tener acuerdos de pago incumplidos
- La multa no debe estar vencida más del plazo permitido

#### Proceso Paso a Paso

**Paso 1: Seleccionar Multas**
1. Vaya a **"Acuerdos de Pago"** → **"Nuevo Acuerdo"**
2. Marque las multas que desea incluir
3. El sistema calculará el total

**Paso 2: Configurar Condiciones**

Complete el formulario:

**Información del Solicitante:**
- Nombre completo (pre-cargado)
- Documento (pre-cargado)
- Teléfono de contacto
- Correo electrónico
- Dirección actual

**Condiciones de Pago:**
- **Cuota inicial:** Mínimo 20% del total
- **Número de cuotas:** Máximo según reglamento
- **Frecuencia de pago:**
  - Semanal
  - Quincenal
  - Mensual
- **Fecha de primer pago**

**Paso 3: Revisión del Plan**

El sistema generará automáticamente:
- **Tabla de amortización** con:
  - Número de cuota
  - Fecha de vencimiento
  - Valor de cuota
  - Saldo pendiente
- **Resumen financiero:**
  - Valor total original
  - Descuentos aplicados
  - Intereses (si aplica)
  - Total a pagar

**Paso 4: Aceptación de Términos**

1. Lea los **Términos y Condiciones** del acuerdo
2. Revise las **Cláusulas de incumplimiento**
3. Marque la casilla de aceptación
4. Firme digitalmente (si aplica)

**Paso 5: Generación del Documento**

1. Haga clic en **"Generar Acuerdo"**
2. El sistema procesará la solicitud
3. Recibirá confirmación por pantalla
4. Se enviará copia por correo electrónico

**Paso 6: Descarga y Archivo**

1. Descargue el PDF del acuerdo
2. Guarde copia para sus registros
3. Imprima si es necesario

---

### 7.2 Consultar Acuerdos Existentes

#### Ver Mis Acuerdos

**Paso 1: Acceder al Listado**
1. Seleccione **"Acuerdos de Pago"** en el menú
2. Verá todos sus acuerdos:
   - Vigentes
   - Completados
   - Incumplidos
   - Cancelados

**Paso 2: Detalle del Acuerdo**

Al hacer clic en un acuerdo verá:

**Información General:**
- Número de acuerdo
- Fecha de firma
- Estado actual
- Multas incluidas
- Valor total

**Plan de Pagos:**
- Tabla completa de cuotas
- Cuotas pagadas (con fecha)
- Cuotas pendientes
- Próximo vencimiento
- Saldo pendiente

**Acciones Disponibles:**
- Ver detalles de pago
- Descargar acuerdo (PDF)
- Imprimir recibos
- Solicitar modificación (si aplica)

---

### 7.3 Pago de Cuotas

#### Registrar Pago

**Paso 1: Seleccionar Cuota**
1. En el detalle del acuerdo
2. Identifique la cuota a pagar
3. Haga clic en **"Pagar"**

**Paso 2: Método de Pago**

Seleccione el método:
- **Pago en línea:**
  - PSE (Débito bancario)
  - Tarjeta de crédito
  - Tarjeta débito
  - Corresponsales bancarios

- **Pago presencial:**
  - Genere referencia de pago
  - Pague en bancos autorizados
  - Registre el comprobante

**Paso 3: Confirmación**
1. Complete el proceso de pago
2. Guarde el comprobante
3. El sistema actualizará automáticamente
4. Recibirá confirmación por correo

---

### 7.4 Gestión de Acuerdo Exitoso

#### Pantalla de Confirmación

Después de generar un acuerdo verá:

**Mensaje de Éxito:**
- "Su acuerdo de pago ha sido generado exitosamente"
- Número de acuerdo asignado
- Fecha y hora de generación

**Información Clave:**
- Valor de la primera cuota
- Fecha del primer vencimiento
- Total de cuotas
- Saldo total

**Opciones Disponibles:**
- **Descargar PDF:** Documento completo del acuerdo
- **Ver Detalle:** Acceder a la información completa
- **Volver al Inicio:** Regresar al dashboard

**Instrucciones de Pago:**
- Información sobre cómo pagar
- Canales de pago disponibles
- Plazo para el primer pago
- Consecuencias del incumplimiento

---

## 8. Administración

### 8.1 Gestión de Usuarios

*(Solo para Administradores)*

#### Listar Usuarios

**Paso 1: Acceder al Módulo**
1. Vaya a **"Administración"** → **"Usuarios"**
2. Verá la lista completa de usuarios registrados

**Paso 2: Información Mostrada**

Para cada usuario:
- Nombre completo
- Documento de identificación
- Correo electrónico
- Roles asignados
- Estado: Activo, Inactivo, Suspendido
- Fecha de registro
- Último acceso

**Paso 3: Filtros y Búsqueda**

Puede filtrar por:
- Rol específico
- Estado de cuenta
- Fecha de registro
- Búsqueda por nombre o documento

#### Crear Nuevo Usuario

**Paso 1: Iniciar Creación**
1. Haga clic en **"+ Nuevo Usuario"**
2. Complete el formulario:

**Datos Personales:**
- Nombre completo
- Tipo y número de documento
- Correo electrónico
- Teléfono
- Género
- Ciudad y dirección

**Datos de Acceso:**
- Correo electrónico (usuario)
- Generar contraseña temporal
- Enviar credenciales por correo

**Asignación de Roles:**
- Seleccione uno o varios roles
- Configure permisos específicos

**Paso 2: Guardar y Notificar**
1. Revise la información
2. Haga clic en **"Guardar"**
3. El usuario recibirá un correo con sus credenciales

#### Editar Usuario

**Paso 1: Seleccionar Usuario**
1. En la lista, haga clic en el usuario
2. O use el botón **"Editar"** (ícono de lápiz)

**Paso 2: Modificar Información**

Puede cambiar:
- Datos de contacto
- Roles asignados
- Estado de la cuenta
- Permisos específicos

**Nota:** No se puede modificar el número de documento

**Paso 3: Guardar Cambios**
1. Haga clic en **"Actualizar"**
2. Los cambios se aplican inmediatamente

#### Gestionar Estado de Cuenta

**Activar/Desactivar:**
1. Seleccione el usuario
2. Haga clic en **"Cambiar Estado"**
3. Confirme la acción

**Suspender Temporalmente:**
1. Seleccione el usuario
2. Elija **"Suspender"**
3. Indique el motivo y duración
4. El usuario no podrá acceder durante la suspensión

**Eliminar Usuario:**
1. Solo si no tiene multas o acuerdos asociados
2. Seleccione **"Eliminar"**
3. Confirme la acción (irreversible)

---

### 8.2 Gestión de Roles

#### Listar Roles

**Paso 1: Acceder al Módulo**
1. Vaya a **"Administración"** → **"Roles"**

**Paso 2: Roles Disponibles**

Verá todos los roles del sistema con:
- Nombre del rol
- Descripción
- Número de usuarios asignados
- Permisos asociados
- Estado

#### Crear Nuevo Rol

**Paso 1: Definir Rol**
1. Haga clic en **"+ Nuevo Rol"**
2. Complete:
   - Nombre del rol
   - Descripción detallada
   - Estado (activo/inactivo)

**Paso 2: Asignar Permisos**

Configure permisos por módulo:

**Multas:**
- ☐ Ver multas propias
- ☐ Ver multas de otros
- ☐ Crear multas
- ☐ Editar multas
- ☐ Eliminar multas

**Acuerdos de Pago:**
- ☐ Ver acuerdos propios
- ☐ Ver acuerdos de otros
- ☐ Crear acuerdos
- ☐ Aprobar acuerdos
- ☐ Cancelar acuerdos

**Usuarios:**
- ☐ Ver usuarios
- ☐ Crear usuarios
- ☐ Editar usuarios
- ☐ Eliminar usuarios
- ☐ Asignar roles

**Y así sucesivamente para cada módulo...**

**Paso 3: Guardar Rol**
1. Revise los permisos seleccionados
2. Haga clic en **"Guardar"**

#### Asignar Roles a Usuarios

**Paso 1: Seleccionar Método**

**Opción A: Desde Usuario**
1. Vaya a **"Usuarios"**
2. Edite el usuario
3. Seleccione los roles

**Opción B: Desde Rol**
1. Vaya a **"Roles"**
2. Seleccione el rol
3. Haga clic en **"Asignar Usuarios"**
4. Marque los usuarios
5. Guarde los cambios

---

### 8.3 Gestión de Personas

#### Registro de Personas

El módulo de personas mantiene un registro centralizado:

**Paso 1: Acceder al Módulo**
1. Vaya a **"Administración"** → **"Personas"**

**Paso 2: Lista de Personas**

Muestra todas las personas registradas:
- Nombre completo
- Documento
- Teléfono
- Correo
- Ciudad
- ¿Tiene usuario? (Sí/No)

**Paso 3: Crear Nueva Persona**
1. Haga clic en **"+ Nueva Persona"**
2. Complete el formulario con datos personales
3. Guarde la información

**Nota:** Una persona puede existir sin ser usuario del sistema (ej: para consultas)

---

### 8.4 Parámetros del Sistema

#### Departamentos y Municipios

**Gestión de Departamentos:**
1. Vaya a **"Administración"** → **"Parámetros"** → **"Departamentos"**
2. Puede:
   - Listar departamentos
   - Crear nuevo departamento
   - Editar existentes
   - Activar/Desactivar

**Gestión de Municipios:**
1. Vaya a **"Parámetros"** → **"Municipios"**
2. Para cada municipio configure:
   - Nombre
   - Departamento asociado
   - Código DANE
   - Estado

#### Tipos de Documento

**Gestionar Tipos:**
1. Vaya a **"Parámetros"** → **"Tipos de Documento"**
2. Tipos disponibles:
   - CC: Cédula de Ciudadanía
   - CE: Cédula de Extranjería
   - TI: Tarjeta de Identidad
   - PA: Pasaporte
   - NIT: Número de Identificación Tributaria

**Agregar Nuevo Tipo:**
1. Haga clic en **"+ Nuevo"**
2. Ingrese código y nombre
3. Active/Desactive según necesidad

#### Frecuencias de Pago

**Configurar Frecuencias:**
1. Vaya a **"Parámetros"** → **"Frecuencias de Pago"**
2. Configure:
   - Semanal (7 días)
   - Quincenal (15 días)
   - Mensual (30 días)
   - Bimestral (60 días)

**Para cada frecuencia defina:**
- Número de días
- Descripción
- Número máximo de cuotas permitidas
- Estado (activo/inactivo)

---

### 8.5 Gestión de Formularios y Módulos

#### Formularios

**Administrar Formularios:**
1. Vaya a **"Administración"** → **"Formularios"**
2. Verá todos los formularios del sistema
3. Puede:
   - Crear nuevos formularios
   - Editar campos existentes
   - Definir validaciones
   - Asignar a módulos

#### Módulos

**Gestionar Módulos:**
1. Vaya a **"Administración"** → **"Módulos"**
2. Configure:
   - Nombre del módulo
   - Descripción
   - Icono
   - Orden en menú
   - Formularios asociados
   - Estado

#### Asociación Formulario-Módulo

**Vincular Formularios a Módulos:**
1. Vaya a **"Form-Modules"**
2. Seleccione el módulo
3. Seleccione el formulario
4. Defina el tipo de relación
5. Guarde la asociación

---

### 8.6 Gestión de Permisos

#### Permisos por Rol-Formulario

**Configurar Permisos:**
1. Vaya a **"Administración"** → **"Permisos"**
2. Seleccione el rol
3. Seleccione el formulario
4. Configure permisos:
   - ☐ Ver
   - ☐ Crear
   - ☐ Editar
   - ☐ Eliminar
   - ☐ Aprobar
   - ☐ Exportar

**Aplicar Permisos:**
1. Marque los permisos deseados
2. Haga clic en **"Guardar"**
3. Los usuarios con ese rol verán los cambios inmediatamente

---

## 9. Perfil de Usuario

### 9.1 Ver Mi Perfil

**Paso 1: Acceder al Perfil**
1. Haga clic en su nombre o foto en la barra superior
2. Seleccione **"Mi Perfil"**

**Paso 2: Información Visible**

Su perfil muestra:

**Datos Personales:**
- Foto de perfil
- Nombre completo
- Documento de identificación
- Correo electrónico
- Teléfono
- Género
- Ciudad y dirección

**Información de Cuenta:**
- Rol(es) asignado(s)
- Estado de cuenta
- Fecha de registro
- Último acceso

**Estadísticas Personales:**
- Multas totales
- Multas pendientes
- Acuerdos activos
- Total pagado

---

### 9.2 Editar Perfil

**Paso 1: Modo Edición**
1. En su perfil, haga clic en **"Editar Perfil"**

**Paso 2: Datos Modificables**

Puede cambiar:
- **Foto de perfil:** Cargar nueva imagen
- **Correo electrónico:** Si no está en uso
- **Teléfono**
- **Dirección**

**No puede modificar:**
- Nombre completo
- Documento de identificación
- Género
- Roles asignados

**Paso 3: Cambiar Foto de Perfil**

1. Haga clic en la foto actual
2. Seleccione **"Subir nueva imagen"**
3. Elija archivo de su dispositivo
4. Ajuste el recorte si es necesario
5. Haga clic en **"Guardar"**

**Requisitos de la imagen:**
- Formato: JPG, PNG
- Tamaño máximo: 2 MB
- Dimensiones recomendadas: 400x400 px

**Paso 4: Guardar Cambios**
1. Revise la información modificada
2. Haga clic en **"Actualizar Perfil"**
3. Recibirá confirmación de actualización

---

### 9.3 Cambiar Contraseña

**Desde el Perfil:**

**Paso 1: Acceder a Cambio de Contraseña**
1. En su perfil, haga clic en **"Cambiar Contraseña"**

**Paso 2: Formulario de Cambio**
1. Ingrese su **contraseña actual**
2. Ingrese la **nueva contraseña** (mínimo 6 caracteres)
3. **Confirme la nueva contraseña**

**Paso 3: Validación**

La nueva contraseña debe:
- Tener al menos 6 caracteres
- Contener letras y números (recomendado)
- No ser igual a la anterior
- Coincidir en ambos campos

**Paso 4: Guardar Nueva Contraseña**
1. Haga clic en **"Cambiar Contraseña"**
2. Recibirá confirmación
3. Use la nueva contraseña en su próximo inicio de sesión

**Recomendaciones de seguridad:**
- Use contraseñas únicas
- Combine mayúsculas, minúsculas, números y símbolos
- No comparta su contraseña
- Cámbiela periódicamente (cada 3-6 meses)

---

### 9.4 Cerrar Sesión

**Para salir del sistema:**

**Opción 1: Desde el Menú de Usuario**
1. Haga clic en su nombre (esquina superior derecha)
2. Seleccione **"Cerrar Sesión"**

**Opción 2: Desde el Menú Lateral**
1. En el menú lateral inferior
2. Haga clic en **"Cerrar Sesión"**

**Nota importante:**
- Cierre sesión al terminar, especialmente en computadoras compartidas
- Por seguridad, el sistema cerrará automáticamente después de 30 minutos de inactividad

---

## 10. Preguntas Frecuentes

### 10.1 Acceso y Registro

**P: ¿Cómo obtengo acceso al sistema?**

R: Puede registrarse directamente en la página de inicio haciendo clic en "Registrarse". Complete el formulario y verifique su correo electrónico.

**P: No recibí el correo de verificación, ¿qué hago?**

R:
1. Revise su carpeta de spam o correo no deseado
2. Verifique que el correo ingresado sea correcto
3. Espere 5 minutos antes de solicitar reenvío
4. Use la opción "Reenviar código" en la pantalla de verificación

**P: ¿Puedo usar el sistema sin registrarme?**

R: Sí, puede hacer consultas básicas usando la opción "Identificación", pero con funcionalidad limitada. Para acceso completo necesita registrarse.

**P: Olvidé mi contraseña, ¿cómo la recupero?**

R: En la pantalla de login, haga clic en "¿Olvidó su contraseña?", ingrese su correo registrado y siga las instrucciones que recibirá por email.

---

### 10.2 Multas y Consultas

**P: ¿Cómo sé si tengo multas pendientes?**

R:
1. Ingrese al sistema con sus credenciales
2. Vaya a "Consultar/Ingresar"
3. Sus multas aparecerán automáticamente
También puede hacer consulta rápida sin registro usando su documento.

**P: ¿Por qué no aparecen todas mis multas?**

R:
- Verifique que esté consultando con el documento correcto
- Algunas multas pueden estar en proceso de registro
- Contacte a soporte si falta una multa específica

**P: ¿Puedo ver el detalle de cada multa?**

R: Sí, haga clic en cualquier multa para ver información completa: fecha, lugar, tipo de infracción, valor, estado y documentos adjuntos.

**P: ¿Cómo descargo el comparendo?**

R: En el detalle de la multa, haga clic en el botón "Descargar Comparendo (PDF)".

---

### 10.3 Acuerdos de Pago

**P: ¿Qué es un acuerdo de pago?**

R: Es un convenio que le permite pagar sus multas en cuotas, según su capacidad de pago, en lugar de hacerlo en un solo pago.

**P: ¿Cualquier multa puede incluirse en un acuerdo de pago?**

R: La mayoría sí, pero hay restricciones:
- No deben estar muy vencidas (consulte plazo específico)
- No puede tener acuerdos incumplidos anteriormente
- Algunas infracciones graves pueden tener restricciones

**P: ¿Cuántas cuotas puedo solicitar?**

R: Depende del valor total y la frecuencia de pago. El sistema calculará automáticamente el máximo de cuotas permitidas según las políticas vigentes.

**P: ¿Debo pagar una cuota inicial?**

R: Sí, generalmente se requiere un mínimo del 20% del valor total como cuota inicial al firmar el acuerdo.

**P: ¿Qué pasa si no pago una cuota a tiempo?**

R:
- El acuerdo puede ser declarado incumplido
- Se generarán intereses de mora
- Puede perder los descuentos aplicados
- No podrá generar nuevos acuerdos hasta regularizar

**P: ¿Puedo modificar un acuerdo ya generado?**

R: Depende del estado del acuerdo. Si no ha incurrido en mora y tiene cuotas pendientes, puede solicitar una modificación contactando a un administrador.

**P: ¿Dónde puedo pagar las cuotas?**

R:
- En línea: PSE, tarjetas de crédito/débito
- Presencial: Bancos autorizados con referencia de pago
- Corresponsales bancarios

---

### 10.4 Notificaciones

**P: ¿Por qué recibo tantas notificaciones?**

R: Las notificaciones le ayudan a estar al día. Puede configurar la frecuencia en su perfil, en la sección de preferencias de notificaciones.

**P: No recibo notificaciones por correo**

R:
1. Verifique que su correo esté actualizado en su perfil
2. Revise la carpeta de spam
3. Verifique que las notificaciones por correo estén activadas en su perfil

**P: ¿Puedo desactivar las notificaciones?**

R: Puede configurar qué tipos de notificaciones desea recibir, pero las notificaciones críticas (vencimientos, incumplimientos) no se pueden desactivar.

---

### 10.5 Pagos

**P: ¿Qué métodos de pago aceptan?**

R:
- **En línea:** PSE, tarjetas de crédito/débito
- **Presencial:** Bancos autorizados, corresponsales bancarios

**P: ¿Cuánto tarda en reflejarse mi pago?**

R:
- Pagos en línea: Inmediato (máximo 10 minutos)
- Pagos presenciales: 24-48 horas hábiles

**P: No se reflejó mi pago, ¿qué hago?**

R:
1. Verifique que hayan pasado las horas correspondientes al método
2. Tenga a mano su comprobante de pago
3. Vaya a su perfil → "Reportar pago"
4. Adjunte el comprobante
5. O contacte a soporte técnico

**P: ¿Puedo pagar varias multas a la vez?**

R: Sí, en "Consultar Multas", marque las que desea pagar y seleccione "Pagar seleccionadas".

---

### 10.6 Administración (Para Administradores)

**P: ¿Cómo asigno roles a un usuario?**

R: Vaya a "Administración" → "Usuarios", edite el usuario y en la sección "Roles" seleccione los que desea asignar.

**P: ¿Puedo crear roles personalizados?**

R: Sí, en "Administración" → "Roles" puede crear nuevos roles con permisos específicos.

**P: ¿Cómo cargo multas de manera masiva?**

R: Use la opción "Anexar Multas" → "Carga Masiva", descargue la plantilla Excel, complétela y súbala al sistema.

**P: Un usuario reporta problemas de acceso, ¿qué hago?**

R:
1. Verifique que el usuario esté activo
2. Revise sus roles y permisos
3. Confirme que su correo esté verificado
4. Puede resetear su contraseña si es necesario

---

### 10.7 Problemas Técnicos

**P: La página no carga correctamente**

R:
1. Actualice la página (F5)
2. Borre caché y cookies del navegador
3. Intente con otro navegador
4. Verifique su conexión a Internet

**P: El sistema está muy lento**

R:
- Puede haber alta demanda en el servidor
- Verifique su conexión a Internet
- Cierre pestañas innecesarias
- Intente en un horario diferente

**P: No puedo subir archivos**

R:
- Verifique que el archivo cumpla con el tamaño máximo (2-5 MB según el tipo)
- Use formatos permitidos (PDF, JPG, PNG)
- Intente con un archivo más pequeño

**P: Se cerró mi sesión automáticamente**

R: Por seguridad, el sistema cierra la sesión después de 30 minutos de inactividad. Simplemente vuelva a iniciar sesión.

---



## Consejos de Uso



### Para Operadores

✓ Valide toda la información antes de cargar multas
✓ Use carga masiva para múltiples registros
✓ Adjunte evidencias fotográficas
✓ Verifique duplicados antes de guardar
✓ Mantenga respaldo de archivos importados

### Para Administradores

✓ Revise permisos periódicamente
✓ Audite actividad de usuarios críticos
✓ Mantenga actualizados los parámetros
✓ Realice respaldos regulares
✓ Capacite a nuevos usuarios antes de asignar roles

---

## Seguridad y Privacidad

### Protección de Datos

- Todos los datos están encriptados
- Conexión segura HTTPS
- Cumplimiento de Ley de Protección de Datos
- Auditoría de accesos

### Buenas Prácticas de Seguridad

✓ Use contraseñas seguras y únicas
✓ No comparta sus credenciales
✓ Cierre sesión en computadoras compartidas
✓ Reporte accesos sospechosos inmediatamente
✓ Cambie su contraseña periódicamente

### Privacidad

- Sus datos personales están protegidos
- Solo personal autorizado tiene acceso
- No compartimos información con terceros sin autorización
- Puede solicitar copia de sus datos
- Puede solicitar eliminación de datos (según aplique)

---

## Información de Versión

**Manual de Usuario**
- **Versión:** 1.0
- **Fecha:** Octubre 2025
- **Aplicable a:** Sistema v1.0.0
- **Autores:** Equipo de Desarrollo
- **Última actualización:** 01/10/2025

---

## Contacto y Referencias

**Página Web:** Toca implementar
**Correo Soporte:** Toca implementar
**Teléfono:** Toca implementar
**Dirección:** [Toca implementar

**Horario de Atención:**
 -Toca implementar

---

## Agradecimientos

Gracias por usar el Sistema de Gestión de Multas. Este sistema ha sido diseñado pensando en facilitar sus trámites y mantenerle informado sobre sus obligaciones.

Para cualquier sugerencia o comentario sobre este manual, por favor contáctenos en:
Toca implementar

---

**© 2025 Sistema de Gestión de Multas - Todos los derechos reservados**
