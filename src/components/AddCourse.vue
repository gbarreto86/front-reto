<template>
  <div class="container">
    <h1>{{title}} -- <a href="/" class="btn btn-primary">Listado de Curso</a></h1>
    <form v-on:submit.prevent="addCourse">
      <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Nombre:</label>
            <input type="text" class="form-control" v-model="course.name"/>
          </div>
        </div>
        </div>

        <div class="row">
          <div class="col-md-6">
            <div class="form-group">
              <label>Descrición:</label>
              <textarea cols="5" rows="5" class="form-control col-md-6" v-model="course.description"></textarea>
            </div>
          </div>
        </div>
        
        <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Autor:</label>
            <input type="text" class="form-control" v-model="course.auth"/>
          </div>
        </div>
        </div>

        <div class="row">
        <div class="col-md-6">
          <div class="form-group">
            <label>Calificación:</label>
            <input type="number" class="form-control" v-model="course.calification"/>
          </div>
        </div>
        </div>

        <br />
        <div class="form-group">
          <button class="btn btn-primary">Crear Curso</button>
        </div>
    </form>
  </div>
</template>

<script>
export default {
    data(){
        return {
            title: "Crear Curso",
            tokenSesion:'',
            course: {}
        }
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
                    this.saveCourse(this.tokenSesion);
                })
                .catch(error => {
                    console.log(error)
                    this.errored = true
                })
                .finally(() => this.loading = false)
            },
       addCourse() {
         this.getToken();
       },
       async saveCourse(token){
          const bodyParameters = {
            name: this.course.name,
            summary: this.course.summary,
            imagen: 'image.jpg',
            author:this.course.author,
            calification: this.course.calification
          };

          await this.axios.post('http://localhost:8080/courses', bodyParameters, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
          })
          .then((res) => {
              console.log(res);
          })
          .catch((error) => {
            console.error(error)
          })
      }

    }
}
</script>