import logging
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app, resources={r"/*": {"origins": "*"}},
            methods=["GET", "POST", "PUT", "DELETE"], 
            allow_headers=["Authorization", "Content-Type"],
            supports_credentials=True)

#Datos usuarios para acceder
usuarios = [
    {
        "id": 1,
        "user": "vAyala",
        "password": "password1",
        "nombre": "Victor Ayala",
        "role": "1"
    },
    {
        "id": 2,
        "user": "sJimenez",
        "password": "password2",
        "nombre": "Samuel Jimenez",
        "role": "2"
    }
]

#Lista para almacenar los viajes
viajes = []

#Destinos Duoc
destinos = [
    {
        "destino": "Providencia"
    },
    {
        "destino": "Independencia"
    },
    {
        "destino": "Las Condes"
    }
]
 

@app.after_request
def after_request(response):
    print(response.headers)
    return response

#Logica para obtener Destinos
@app.route('/destinos', methods=['GET'])
@cross_origin(origin='http://localhost:8100', headers=['Content-Type', 'Authorization'])
def obtener_destinos():
    destinos = ['Providencia', 'Independencia', 'Las Condes']  
    return jsonify(destinos)


#Logica para recuperar contraseña
@app.route('/recuperar', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:8100', headers=['Content-Type', 'Authorization'])
def recuperar_contrasena():
    
    if request.method == 'OPTIONS':
        # Respuesta para la solicitud OPTIONS
        response = app.response_class(
            response='',
            status=200,
            mimetype='application/json'
        )
    else: 
        username = request.json.get('user')
        usuario = next((u for u in usuarios if u["user"] == username ), None)
    
        if usuario:
            return jsonify({
                "nombre": usuario["nombre"]
            }), 200
        else:
            return jsonify({"message": "El usuario no existe"}), 404


#Logica para acceder al login
@app.route('/login', methods=['POST'])
@cross_origin(origin='http://localhost:8100', headers=['Content-Type', 'Authorization'])
def login():
    username = request.json.get('user')
    password = request.json.get('password')
    
    usuario = next((u for u in usuarios if u["user"] == username and u["password"] == password), None)
    
    if usuario:
        return jsonify({
            "id": usuario["id"],
            "nombre": usuario["nombre"],
            "user": usuario["user"],
            "role": usuario["role"]
        }), 200
    else:
        return jsonify({"message": "Credenciales incorrectas"}), 401

@app.route('/usuario-actual', methods=['GET'])
@cross_origin(origin='http://localhost:8100', headers=['Content-Type', 'Authorization'])
def obtener_usuario_actual():
    try:
        # Obtén el token del encabezado de la solicitud
        token = request.headers.get('Authorization')

        # Lógica para autenticar al usuario con el token
        usuario_actual = autenticar_usuario_con_token(token)

        if usuario_actual:
            logging.debug(f'Usuario autenticado: {usuario_actual}')
            return jsonify({
                "id": usuario_actual["id"],
                "nombre": usuario_actual["nombre"],
                "user": usuario_actual["user"],
                "role": usuario_actual["role"]
            }), 200
        else:
            logging.debug('Usuario no autenticado')
            return jsonify({"message": "Usuario no autenticado"}), 401
    except Exception as e:
        logging.error(f'Error en la función obtener_usuario_actual: {str(e)}')
        return jsonify({"message": "Error en el servidor"}), 500
    
#Logica para agregar viajes
@app.route('/home/viajes', methods=['POST'])
@cross_origin(origin='http://localhost:8100', headers=['Content-Type', 'Authorization'])
def crear_viaje():
    
    try:
        if request.method == 'POST':
            nuevo_viaje = request.get_json()

            # Validar y procesar la solicitud
            if 'horarioSalida' in nuevo_viaje and 'costoPorPersona' in nuevo_viaje and 'destino' in nuevo_viaje:
                # Agregar el nuevo viaje a la lista
                viajes.append({
                    'horarioSalida': nuevo_viaje['horarioSalida'],
                    'costoPorPersona': nuevo_viaje['costoPorPersona'],
                    'destino': nuevo_viaje['destino'],
                    'capacidad': nuevo_viaje['capacidad']
                })

                return jsonify({'mensaje': 'Viaje creado exitosamente'}), 201
            else:
                return jsonify({'error': 'Datos de viaje incompletos'}), 400
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500   

@app.route('/usuarios', methods=['GET'])
@cross_origin(origin='http://localhost:8100', headers=['Content-Type', 'Authorization'])
def obtener_usuarios():
    return jsonify(usuarios)

@app.route('/carrera/viajes', methods=['GET'])
@cross_origin(origin='http://localhost:8100', headers=['Content-Type', 'Authorization'])
def obtener_viajes_carrera():
    # Lógica para obtener los viajes de carrera
    # ...

    # Devuelve los viajes en formato JSON
    return jsonify(viajes)

# Logica para reducir la capacidad del viaje
@app.route('/carrera/reducir-capacidad', methods=['POST'])
@cross_origin(origin='http://localhost:8100', headers=['Content-Type', 'Authorization'])
def reducir_capacidad():
    try:
        data = request.get_json()
        viaje = data.get('viaje')

        # Encuentra el viaje en la lista y reduce la capacidad a 0
        for v in viajes:
            if v == viaje:
                v['capacidad'] = 0

        return jsonify({'mensaje': 'Capacidad reducida exitosamente'}), 200
    except Exception as e:
        return jsonify({'error': f'Error en el servidor: {str(e)}'}), 500

# Nueva función para autenticar al usuario con el token
def autenticar_usuario_con_token(token):
    # Lógica para autenticar al usuario según el token
    # Puedes utilizar bibliotecas como PyJWT para verificar y decodificar el token
    
    # Ejemplo simple (para propósitos educativos, considera usar PyJWT en un entorno de producción)
    if token == 'mi_token_secreto':
        # Si el token es válido, devuelve el usuario correspondiente
        return {
            "id": 1,
            "user": "vAyala",
            "nombre": "Victor Ayala",
            "role": "1"
        }
    else:
        # Si el token no es válido, devuelve None
        return None
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')
    
