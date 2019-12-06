var fields={
   name:{
    key: 'name',
    label: 'Name',
    bg: '#FF3341',
   },
   family:{
    key: 'family',
    label: 'Family',
    bg: '#FFD557',
   },
   username:{
    key: 'username',
    label: 'User Name',
    bg: '#84D7E9',
   },
   email:{
    key: 'email',
    label: 'Email',
    bg: '#c6c6c6',
   }
},
data=[
    {name:'john',family:'doe',username:'johndoe',email:'johndo@example.com'},
    {name:'jaffar',family:'esmaily',username:'jafferes',email:'jaffar9898@gmail.com'}
]

__grid.init({
    gridId:'users_list',
    fields:fields,
    data:data,
    gridable:true
})