<template>
    <div class="container">
        <h1>{{title}} -- <a href="/add" class="btn btn-primary">Nuevo Curso</a></h1>
        <table class="table table-hover">
            <thead>
            <tr>
                <td>ID</td>
                <td>Nombre</td>
                <td>Descrición</td>
                <td>Autor</td>
                <td>Calificación</td>
                <td>Editar</td>
                <td>Eliminar</td>
            </tr>
            </thead>
            <tbody>
               <tr v-for="course in courses" :key="course._id">
                    <td>{{ course.id }}</td>
                    <td>{{ course.name }}</td>
                    <td>{{ course.summary }}</td>
                    <td>{{ course.author }}</td>
                    <td>{{ course.calification }}</td>
                    <td><a href="#">Ediar</a></td>
                    <td><a href="#">Borrar</a></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    export default {
        data(){
            return{
                title: "Listado de Cursos",
                tokenSesion:'',
                courses: null
            }
        },
        created: function()
        {
            this.getToken();
        },
        methods: {
            async getToken()
            {
                const dataForToken = {
                    grant_type: "client_credentials",
                    client_id: "4",
                    client_secret: "ANZmudMOqjqZRzSEoxmNb5U4AsXdXprIYiJRCqiP"
                };

                await this.axios
                .post('http://localhost:8080/oauth/token', dataForToken, {headers:{
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
                    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token"}
                })
                .then(response => {
                    this.tokenSesion = response.data.access_token;
                    this.getCourse(this.tokenSesion);
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
            },
            async getCourse(token){
                await this.axios.get('http://localhost:8080/courses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
                })
                .then((res) => {
                    this.courses = res.data.data
                })
                .catch((error) => {
                console.error(error)
                })
            }
        }
    }
</script>