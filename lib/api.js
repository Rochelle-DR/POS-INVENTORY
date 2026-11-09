const USE_MOCK = true;

export async function Login(username,password) {
    if (USE_MOCK){
        if(username ==='admin'&&password ==='admin123'){
            return{token:'fake-token', user:{name:'Admin',role:'Admin'}};
        }
        if(username ==='cashier' && password ==='cashier123'){
            return{token:'fake-token', user:{name:'Cashier', role:'Cashier'}};
        }
      throw new Error('Invalid username or password');
    }
    
}


    
