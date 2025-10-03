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
9. [Aplicación Móvil](#9-aplicación-móvil)
10. [Preguntas Frecuentes](#10-preguntas-frecuentes)

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

- Sistema operativo actualizado (Windows 10+)
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
- Ver notificaciones

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
- Ver detalles del acuerdo
- Descargar acuerdo (PDF)
- Imprimir documento
- Solicitar modificación (si aplica)

---

### 7.3 Gestión de Acuerdo Exitoso

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

**Información Importante:**
- Plazo para el primer pago
- Consecuencias del incumplimiento
- Entidades autorizadas para realizar pagos

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
-  Ver multas propias
-  Ver multas de otros
-  Crear multas
-  Editar multas
-  Eliminar multas

**Acuerdos de Pago:**
-  Ver acuerdos propios
-  Ver acuerdos de otros
-  Crear acuerdos
-  Aprobar acuerdos
-  Cancelar acuerdos

**Usuarios:**
-  Ver usuarios
-  Crear usuarios
-  Editar usuarios
-  Eliminar usuarios
-  Asignar roles

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
   -  Ver
   -  Crear
   -  Editar
   -  Eliminar
   -  Aprobar
   -  Exportar

**Aplicar Permisos:**
1. Marque los permisos deseados
2. Haga clic en **"Guardar"**
3. Los usuarios con ese rol verán los cambios inmediatamente

---

## 9. Aplicación Móvil

### 9.1 Introducción a la Aplicación Móvil

Además del sistema web, el Sistema de Gestión de Multas Ciudadanas cuenta con una **aplicación móvil** que permite a los ciudadanos consultar sus infracciones al Código Nacional de Policía y Convivencia desde dispositivos Android.

**⚠️ Importante:** Esta aplicación está diseñada para consultar **infracciones al Código Nacional de Policía y Convivencia** (multas ciudadanas por comportamientos que afectan la convivencia), **NO para multas de tránsito**.

**Tipos de infracciones que puedes consultar:**
- Amenazas a personas
- Agresiones físicas
- Discriminación
- Uso indebido de pólvora
- Comportamientos que afectan la tranquilidad pública
- Violaciones a derechos de menores
- Violencia contra la mujer
- Otros comportamientos contrarios a la convivencia

**Funcionalidades principales:**
- Consulta de infracciones y multas ciudadanas por documento de identidad
- Revisión del Código Nacional de Policía y Convivencia colombiano
- Consulta de acuerdos de pago activos
- Cálculo de valores de multas según SMDLV (Salario Mínimo Legal Diario Vigente)

---

### 9.2 Requisitos para la Aplicación Móvil

#### Dispositivos Compatibles
- **Android**: Versión 8.0 (Oreo) o superior

**⚠️ Nota Importante:** Esta aplicación está disponible **únicamente para dispositivos Android**. No hay versión para iOS (iPhone/iPad).

#### Requisitos Adicionales
- Conexión a Internet (WiFi o datos móviles)
- Espacio de almacenamiento: Por determinar
- Permisos de instalación desde fuentes desconocidas (si se instala vía APK)

---

### 9.3 Instalación de la Aplicación Móvil

#### Método 1: Instalación con Expo Go (Recomendado)

**Paso 1: Instalar Expo Go**
1. Abra la **Google Play Store** en su dispositivo Android
2. Busque **"Expo Go"**
3. Instale la aplicación

**Paso 2: Obtener el enlace del proyecto**
1. Solicite el enlace QR o el link del proyecto a su institución o administrador

**Paso 3: Abrir la aplicación en Expo Go**
1. Abra la app **Expo Go** en su dispositivo
2. Escanee el código QR proporcionado o ingrese el enlace del proyecto
3. Espere a que cargue la aplicación

**Ventajas de este método:**
- No requiere instalar APK
- No necesita habilitar fuentes desconocidas
- Solo requiere Expo Go y conexión a Internet
- Actualizaciones automáticas

---

### 9.4 Inicio de la Aplicación Móvil

#### Pantalla de Bienvenida

Al abrir la aplicación por primera vez, verá:
- Logo del sistema
- Botón **"Iniciar"** para comenzar

**Funcionalidad de Seguridad:**
- La aplicación tiene un **temporizador de inactividad de 5 minutos**
- Si no interactúa durante este tiempo, automáticamente volverá a la pantalla de bienvenida
- Este mecanismo protege su privacidad en caso de que deje la aplicación abierta

---

### 9.5 Consulta de Infracciones en la Aplicación Móvil

#### Proceso de Consulta

**Paso 1: Completar Formulario de Consulta**

En la pantalla principal, complete los siguientes campos:

1. **Tipo de Documento:** Seleccione entre:
   - Cédula de Ciudadanía (CC)
   - Tarjeta de Identidad (TI)
   - Cédula de Extranjería (CE)

2. **Número de Documento:** Ingrese su número de identificación

3. **Términos y Condiciones:**
   - Marque la casilla de verificación
   - Puede leer los términos completos tocando el enlace

**Paso 2: Consultar Multas**

1. Presione el botón **"Consultar Multas"**
2. Espere mientras el sistema busca su información
3. Será redirigido a la pantalla de resultados

**Paso 3: Visualizar Resultados**

La pantalla de resultados muestra:
- **Resumen:** Número total de infracciones ciudadanas
- **Lista de infracciones:** Cada una con:
  - Tipo de infracción (ej: amenazas, agresión física, discriminación)
  - Descripción breve del comportamiento contrario a la convivencia
  - Nombre asociado
  - Checkbox para selección

**Funcionalidades Adicionales en Resultados:**
- **Barra de búsqueda:** Filtre infracciones por nombre, tipo o descripción
- **Selección múltiple:** Toque el checkbox para seleccionar/deseleccionar infracciones
- **Expandir detalles:** Toque una infracción para ver más información
- **Ver más:** Presione "Ver más" para acceder al detalle completo

---

### 9.6 Detalle de Infracción en Móvil

Al seleccionar una infracción y presionar **"Ver más"**, accederá a:

**Información de la Infracción:**
- Tipo de infracción
- Descripción completa del comportamiento contrario a la convivencia
- Fecha y hora

**Información de la Multa:**
- Datos adicionales según el tipo de infracción
- Estado del proceso

**Monto y Fechas:**
- Monto a pagar (si aplica)
- Fecha máxima de pago

**Consulta SMDLV:**
- Enlace **"Consulta SMDLV"** para calcular el valor de la multa

---

### 9.7 Calculadora SMDLV

#### ¿Qué es SMDLV?

El **SMDLV (Salario Mínimo Legal Diario Vigente)** es la unidad de medida para calcular las multas en Colombia. Se calcula dividiendo el salario mínimo mensual entre 30 días.

#### Cómo usar la Calculadora

**Paso 1: Acceder**
1. Desde el detalle de una infracción, toque **"Consulta SMDLV"**

**Paso 2: Seleccionar Tipo de Multa**
1. Verá las opciones de multas disponibles
2. Toque el tipo de multa correspondiente a su infracción

**Paso 3: Ver Cálculo Detallado**

El sistema mostrará:
- **Número de SMDLV** aplicables
- **Salario mínimo vigente** actual
- **Cálculo del SMDLV** (Salario mínimo ÷ 30)
- **Valor de un SMDLV**
- **Cálculo del valor total** (SMDLV × Número de SMDLV)
- **Valor Total a Pagar**

---

### 9.8 Código Nacional de Policía y Convivencia

#### Acceder al Código

**Paso 1: Navegación**
1. Desde la pantalla de resultados de multas
2. Toque el ícono de **"Código de Convivencia"** en la barra inferior

**Paso 2: Explorar el Catálogo**

Podrá consultar las siguientes leyes:

- **LEY 1801 DE 2016:** Código Nacional de Policía y Convivencia
  - Amenazas a personas
  - Agresiones físicas
  - Discriminación
  - Comportamientos que afectan la tranquilidad

- **LEY 2318 DE 2023:** Diversidad sexual y de género

- **LEY 2197 DE 2022:** Violencia contra servidores públicos

- **LEY 2054 DE 2022:** Control de artículos pirotécnicos

- **LEY 1804 DE 2016:** Protección integral a la primera infancia

- **LEY 1257 DE 2008:** Protección contra violencia hacia la mujer

- **LEY 1098 DE 2006:** Código de Infancia y Adolescencia

- **LEY 599 DE 2000:** Código Penal Colombiano

**Paso 3: Buscar Ley Específica**

1. Use la **barra de búsqueda** superior
2. Ingrese palabras clave (ej: "amenazar", "pólvora", "violencia")
3. Verá lista de leyes con:
   - Título de la ley
   - Descripción breve del comportamiento regulado

**Paso 4: Ver Detalle de Ley**

Toque cualquier ley para ver:
- **Descripción detallada** del comportamiento contrario a la convivencia
- **Texto completo** de la ley
- **Multas asociadas** en SMDLV
- **Artículos relacionados** del código

---

### 9.9 Acuerdos de Pago en Móvil

#### Consultar Acuerdos de Pago

**Paso 1: Acceder al Módulo**
1. Desde la pantalla de resultados de multas
2. Toque el ícono de **"Acuerdo de Pago"** en la barra inferior

**Paso 2: Visualizar Lista de Acuerdos**

Verá todos los acuerdos con indicadores visuales:
- **Verde:** Acuerdo pagado
- **Azul/Gris:** Acuerdo pendiente

**Paso 3: Buscar Acuerdo Específico**

Use la **barra de búsqueda** para filtrar por:
- Nombre
- Número de documento
- Tipo de infracción
- Descripción

**Paso 4: Ver Detalle del Acuerdo**

Toque cualquier acuerdo para expandir y ver:

**Información Personal:**
- Nombre completo
- Número de documento
- Teléfono
- Dirección

**Detalles de la Infracción:**
- Tipo de infracción al Código de Convivencia
- Descripción del comportamiento contrario a la convivencia

**Detalles del Acuerdo:**
- Vigencia del acuerdo
- Método de pago
- Número de cuotas

**Información Financiera:**
- Monto base
- Cuota mensual
- Saldo pendiente
- Estado del proceso coactivo

**Paso 5: Limpiar Búsqueda**
- Presione el botón **"Limpiar"** para reiniciar la búsqueda

---

### 9.10 Navegación en la Aplicación Móvil

#### Barra de Navegación Inferior

La aplicación cuenta con una barra de navegación en la parte inferior con tres opciones:

1. **Infracción** (ícono de lista)
   - Vuelve a la pantalla de resultados de multas
   - Muestra todas las infracciones consultadas

2. **Código de Convivencia** (ícono de libro)
   - Accede al catálogo completo de leyes
   - Consulta normativa vigente

3. **Acuerdo de Pago** (ícono de tarjeta)
   - Consulta acuerdos de pago activos
   - Revisa estado financiero

#### Botón de Retroceso

- Todas las pantallas internas tienen un botón de **retroceso (←)** en la esquina superior izquierda
- Tóquelo para volver a la pantalla anterior
- Mantiene el flujo de navegación intuitivo

---

### 9.11 Guía de Uso Paso a Paso - Aplicación Móvil

#### Caso de Uso 1: Consultar mis Multas Ciudadanas

1. Abra la aplicación y presione **"Iniciar"**
2. Seleccione su **tipo de documento** (CC, TI, CE)
3. Ingrese su **número de documento**
4. Marque **"Acepto los términos y condiciones"**
5. Presione **"Consultar Multas"**
6. Espere a que cargue la información
7. Revise la lista de infracciones al Código de Convivencia
8. Toque cualquier infracción para expandir detalles
9. Presione **"Ver más"** para información completa

#### Caso de Uso 2: Calcular el Valor de una Multa

1. Desde el detalle de una infracción
2. Toque **"Consulta SMDLV"**
3. Seleccione el tipo de multa correspondiente
4. Revise el cálculo detallado:
   - Número de SMDLV
   - Salario mínimo vigente
   - Cálculo automático
5. Verá el **valor total a pagar**

#### Caso de Uso 3: Consultar una Ley del Código de Convivencia

1. Vaya a la pantalla de resultados de multas
2. Toque **"Código de Convivencia"** en la barra inferior
3. Use la barra de búsqueda
4. Escriba palabras clave (ej: "amenazar", "pólvora", "violencia")
5. Toque la ley que desee consultar
6. Lea el contenido completo con:
   - Descripción detallada
   - Texto de la ley
   - Multas asociadas

#### Caso de Uso 4: Revisar un Acuerdo de Pago

1. Vaya a la pantalla de resultados de multas
2. Toque **"Acuerdo de Pago"** en la barra inferior
3. Espere a que carguen los acuerdos
4. Identifique el acuerdo por el color:
   - Verde = Pagado
   - Azul/Gris = Pendiente
5. Toque el acuerdo que desea revisar
6. Revise toda la información:
   - Datos personales
   - Detalles de infracción
   - Información financiera
7. Anote la cuota mensual y saldo pendiente

---

### 9.12 Preguntas Frecuentes - Aplicación Móvil

**P: ¿Por qué la aplicación vuelve al inicio?**

R: La aplicación tiene un temporizador de inactividad de 5 minutos. Si no interactúa durante este tiempo, automáticamente regresa a la pantalla de bienvenida por seguridad.

**P: ¿La aplicación guarda mi información?**

R: No, la aplicación **no almacena ninguna información personal** en el dispositivo. Todas las consultas se realizan en tiempo real al servidor.

**P: ¿Qué hago si no aparecen mis multas?**

R:
- Verifique que su número de documento esté correcto
- Asegúrese de tener conexión a Internet activa
- Intente nuevamente en unos minutos
- Si el problema persiste, contacte con soporte

**P: ¿Puedo pagar las multas desde la aplicación móvil?**

R: No, actualmente la aplicación solo permite **consultar información**. Para realizar pagos, debe dirigirse a:
- El sistema web
- Las entidades financieras autorizadas
- Canales de pago oficiales

**P: ¿Qué significa SMDLV?**

R: **SMDLV** significa **Salario Mínimo Legal Diario Vigente**. Es la unidad de medida usada en Colombia para calcular el valor de las multas. Se calcula dividiendo el salario mínimo mensual entre 30.

**P: ¿Los términos y condiciones son obligatorios?**

R: Sí, debe aceptar los términos y condiciones antes de consultar multas. Esto es necesario para el uso de la aplicación y el tratamiento de datos personales.

**P: ¿La aplicación está disponible para iPhone?**

R: No, actualmente la aplicación está disponible **únicamente para dispositivos Android** (versión 8.0 o superior). No hay versión para iOS.

**P: ¿Necesito crear una cuenta para usar la aplicación?**

R: No, la aplicación móvil permite consultas directas con solo ingresar su tipo y número de documento. No requiere registro ni creación de cuenta.

---

### 9.13 Solución de Problemas - Aplicación Móvil

#### La aplicación no carga

**Solución:**
1. Verifique su conexión a Internet (WiFi o datos móviles)
2. Cierre completamente la aplicación
3. Vuelva a abrirla
4. Si usa Expo Go, verifique que esté actualizado
5. Si persiste, reinicie su dispositivo

#### No puedo ver el detalle de una infracción

**Solución:**
1. Asegúrese de haber tocado la infracción para expandirla
2. Presione el botón **"Ver más"**
3. Verifique su conexión a Internet
4. Si no carga, intente con otra infracción
5. Vuelva atrás y reintente

#### El botón "Consultar Multas" está deshabilitado

**Causas:**
- No ha seleccionado el tipo de documento
- No ha ingresado el número de documento
- No ha aceptado los términos y condiciones

**Solución:**
1. Complete todos los campos requeridos
2. Marque la casilla de términos y condiciones
3. El botón se habilitará automáticamente

#### La búsqueda no funciona

**Solución:**
1. Verifique que haya escrito correctamente
2. Presione el botón **"Limpiar"** para reiniciar
3. Intente con diferentes palabras clave
4. Asegúrese de estar en la sección correcta

#### Errores Comunes

**Error: "No se encontraron multas"**

Posibles causas:
- No tiene multas registradas en el sistema
- El documento ingresado es incorrecto
- Error temporal de conexión

**Solución:**
- Verifique el número de documento
- Presione **"Reintentar"**
- Intente más tarde

**Error de conexión**

**Solución:**
1. Verifique su conexión WiFi o datos móviles
2. Intente cambiar de red
3. Si usa datos móviles, verifique que tenga saldo
4. Reinicie su conexión a Internet

**La aplicación se cierra inesperadamente**

**Solución:**
1. Asegúrese de tener la versión más reciente de Expo Go
2. Libere espacio en su dispositivo
3. Cierre otras aplicaciones en segundo plano
4. Reinstale Expo Go si persiste
5. Contacte a soporte técnico

**Pantalla en blanco o no responde**

**Solución:**
1. Espere unos segundos (puede estar cargando)
2. Toque la pantalla para verificar respuesta
3. Use el botón de retroceso de Android
4. Cierre y vuelva a abrir la aplicación
5. Verifique la conexión a Internet

---

### 9.14 Diferencias entre Sistema Web y Aplicación Móvil

| Característica | Sistema Web | Aplicación Móvil |
|----------------|-------------|------------------|
| **Plataforma** | Navegador (PC, tablet, móvil) | Android únicamente |
| **Registro de usuario** | Requerido para funcionalidad completa | No requerido |
| **Consulta de multas** | ✅ Sí | ✅ Sí |
| **Generación de acuerdos** | ✅ Sí | ❌ Solo consulta |
| **Pago de multas** | ✅ Sí | ❌ No |
| **Notificaciones** | ✅ Sí | ❌ No |
| **Código de Convivencia** | ✅ Sí | ✅ Sí |
| **Cálculo SMDLV** | ✅ Sí | ✅ Sí |
| **Administración** | ✅ Sí (según rol) | ❌ No |
| **Gestión de usuarios** | ✅ Sí (admin) | ❌ No |
| **Anexar multas** | ✅ Sí (operadores/admin) | ❌ No |
| **Almacenamiento local** | Cookies/sesión | ❌ No almacena datos |
| **Seguridad de sesión** | 30 minutos | 5 minutos |

**Recomendaciones de uso:**

- **Use el sistema web para:**
  - Gestión completa de multas y pagos
  - Generación de acuerdos de pago
  - Administración del sistema
  - Tareas que requieren registro

- **Use la aplicación móvil para:**
  - Consultas rápidas desde cualquier lugar
  - Verificar infracciones sin registro
  - Consultar el Código de Convivencia
  - Calcular valores de multas (SMDLV)

---

### 9.15 Glosario de Términos - Aplicación Móvil

**SMDLV:** Salario Mínimo Legal Diario Vigente - Unidad de medida para calcular multas

**Expo Go:** Aplicación que permite ejecutar proyectos Expo sin necesidad de compilar

**CC:** Cédula de Ciudadanía

**TI:** Tarjeta de Identidad

**CE:** Cédula de Extranjería

**Infracción:** Violación a las normas del Código Nacional de Policía y Convivencia

**Código de Convivencia:** Conjunto de normas que regulan el comportamiento ciudadano

**Proceso Coactivo:** Proceso administrativo para cobrar deudas

**Acuerdo de Pago:** Convenio para pagar una multa en cuotas

**APK:** Formato de archivo de instalación para Android

**Temporizador de inactividad:** Mecanismo de seguridad que cierra la sesión tras período sin uso

---

### 9.16 Seguridad y Privacidad - Aplicación Móvil

#### Protección de Datos

- **No almacena información personal** en el dispositivo
- Todas las consultas se realizan en **tiempo real** al servidor
- **Conexión segura** mediante HTTPS
- **Cumplimiento** de Ley de Protección de Datos Personales
- **Temporizador de seguridad** de 5 minutos de inactividad

#### Buenas Prácticas de Seguridad

✓ No comparta su dispositivo desbloqueado con terceros
✓ Use redes WiFi seguras para consultas
✓ Cierre la aplicación después de usarla
✓ No tome capturas de información sensible
✓ Verifique que esté usando la aplicación oficial

#### Privacidad

- Sus consultas no quedan registradas en el dispositivo
- La información solo es visible durante la sesión activa
- El sistema cierra automáticamente por inactividad
- No se comparte información con aplicaciones de terceros
- Solo se accede a datos del servidor oficial

---

### 9.17 Actualizaciones de la Aplicación Móvil

#### Versión Actual

- **Versión:** 1.0.0
- **Fecha de lanzamiento:** Octubre 2025
- **Plataforma:** Android (Expo)

#### Cómo Verificar Actualizaciones

**Si usa Expo Go:**
1. Las actualizaciones se aplican **automáticamente**
2. Solo necesita abrir la aplicación con el enlace actualizado
3. No requiere desinstalar ni reinstalar

**Si usa APK:**
1. Deberá descargar la nueva versión del APK
2. Desinstalar la versión anterior
3. Instalar la nueva versión
4. Contacte a su administrador para obtener el nuevo APK

#### Registro de Cambios

**Versión 1.0.0 (Actual)**
- Lanzamiento inicial de la aplicación móvil
- Consulta de infracciones ciudadanas
- Código Nacional de Policía y Convivencia
- Consulta de acuerdos de pago
- Calculadora SMDLV

---

### 9.18 Recursos y Soporte - Aplicación Móvil

#### Canales de Soporte

**Correo Electrónico:**
Toca que implemetarlos 

**Teléfono:**
toca que implementarlos 

#### Información para Reportar Problemas

Al reportar un problema con la aplicación móvil, proporcione:

**Información del Dispositivo:**
- Marca y modelo del dispositivo
- Versión de Android
- Memoria RAM disponible

**Información de la App:**
- ¿Usa Expo Go o APK?
- Versión de Expo Go (si aplica)
- Pasos para reproducir el problema

**Descripción del Problema:**
- ¿Qué intentaba hacer?
- ¿Qué sucedió exactamente?
- ¿Aparece algún mensaje de error?
- Capturas de pantalla (si es posible)

**Conectividad:**
- ¿Usa WiFi o datos móviles?
- ¿Tiene conexión estable a Internet?

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

---

### 10.4 Notificaciones

**P: ¿Por qué recibo tantas notificaciones?**

R: Las notificaciones le ayudan a estar al día. Puede configurar la frecuencia contactando al administrador del sistema.

**P: No recibo notificaciones por correo**

R:
1. Verifique que su correo esté actualizado
2. Revise la carpeta de spam
3. Contacte al administrador para verificar la configuración de notificaciones

**P: ¿Puedo desactivar las notificaciones?**

R: Puede configurar qué tipos de notificaciones desea recibir, pero las notificaciones críticas (vencimientos, incumplimientos) no se pueden desactivar.

---

### 10.5 Administración (Para Administradores)

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

### 10.6 Problemas Técnicos

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

**P: No puedo ingresar**

R:
- Verifique que el archivo cumpla con el tamaño máximo (*-* MB según el tipo)
- Use formatos permitidos (PDF)
- Intente con un archivo más pequeño

**P: Se cerró mi sesión automáticamente**

R: Por seguridad, el sistema cierra la sesión después de * minutos de inactividad. Simplemente vuelva a iniciar sesión.

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
**Dirección:** Toca implementar

**Horario de Atención:**
 -Toca implementar

---

## Agradecimientos

Gracias por usar el Sistema de Gestión de Multas. Este sistema ha sido diseñado pensando en facilitar sus trámites y mantenerle informado sobre sus obligaciones.

Para cualquier sugerencia o comentario sobre este manual, por favor contáctenos en:
Toca implementar

---

**© 2025 Sistema de Gestión de Multas - Todos los derechos reservados**
