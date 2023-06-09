from app import app
from config import config

if __name__ == '__main__':
    app.config.from_object(config['dev'])
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'
    app.config['UPLOAD_EXTENSIONS'] = ['.jpg', '.png', 'jpeg']
    app.run(debug=True)