from flask import Flask, render_template, url_for 

app = Flask(__name__)

@app.route("/", methods=["GET"])
def home(): 
    return render_template("home.html")
    
@app.route("/login", methods=["GET", "POST"])
def login(): 
    return render_template("login.html")

@app.route("/pokedex", methods=["GET"])
def pokedex(): 
    return render_template("pokedex.html")

@app.route("/cadastro", methods=["GET", "POST"])
def cadastro():

    return render_template("cadastro.html")

if __name__ == "__main__":
    app.run(debug=True)
