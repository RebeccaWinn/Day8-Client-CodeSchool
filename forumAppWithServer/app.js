var app= new Vue({
    el:"#app",
    data:{
        page:"forum",
        threads_empty:"There are no threads for this category",
        posts_empty:"There are no posts for this thread",
        //for filtering
        selected_category:"all",

        categories:[
            "all",
            "clothing",
            "hunting",
            "books",
            "cards",
            "coins",
            "keychains",
            "comic books",
            "misc."
            
        ],
        index:0,
        postings:[],
        //for a new thread
        new_name:"",
        new_author:"",
        new_description:"",
        new_category:"all",

        //for a new post
        new_post_author:"",
        new_post_body:"",

        server_url:"http://forum2021.codeschool.cloud",

        threads:[]
    },
    created:function(){
        this.getThreads();
    },

    methods:{
        getThreads:function(){
            fetch(this.server_url+"/thread").then(function(response){
                response.json().then(function(data){
                    app.threads=data;
                    console.log(data)
                })
            })

        },


        createThread: function(){
            // var for a new thread
            var new_thread={
                name: this.new_name,
                author:this.new_author,
                description:this.new_description,
                category:this.new_category,
            };
            //push the new thread to threads list
            fetch(this.server_url+"/thread",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(new_thread)
            }).then(function(){
                //clear the inputs
                app.getThreads();
                app.new_name="";
                app.new_author="";
                app.new_description="";
                app.category="all";
                app.page="forum";

            })


        },


        //delete Thread function here
        deleteThread: function(thread_id){
            fetch(this.server_url+"/thread/"+thread_id,{
                method:"DELETE",
                headers:{
                    "Content-Type":"application/json"
                }
            }).then(function(){
                app.getThreads();
            })
            
        },

        getPosts: function(index){
            this.postings= this.threads[index].posts;
            this.page="posts";
            this.index=index;
        },

        //Create Post
        createPost: function(){
            var new_post={
                author: this.new_post_author,
                body: this. new_post_body
            }
            this.postings.unshift(new_post)
            this.new_post_author="";
            this.new_post_body="";
        },

        deletePost: function(index){
            this.postings.splice(index,1)
        }


    },
    computed:{
        //sorted threads here

        sorted_threads:function(){
            //if selected_category == "all"

            if( this.selected_category == "all"){
                return this.threads
            }
            //else filter through and see if category is equal to selected_category
            else{
                var sorted_threads= this.threads.filter(function(thread){
                    return thread.category == app.selected_category;
                });
                return sorted_threads
            }

        }

    }




});