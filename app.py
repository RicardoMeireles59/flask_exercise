from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def home(): 
    return render_template("home.html")
    
@app.route("/login")
def login(): 
    return render_template("login.html")

@app.route("/pokedex")
def pokedex(): 
    return render_template("pokedex.html")

@app.route("/cadastro")
def cadastro(): 
    return render_template("cadastro.html")

if __name__ == "__main__":
    app.run(debug=True)
