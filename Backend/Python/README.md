# Virtual Environment

To create virtual Environment

- macOs/Linux

```bash
python3 -m venv .venv
```

- Windows

```bash
py -3 -m venv .venv
```

- macOs/Linux To activate virtual Environment

```bash
. .venv/bin/activate
```

- Windows

```bash
.venv\Scripts\activate
```

# Requirements

To install packages

```bash
pip install -r requirements.txt
```

# Usage

To run the server

```bash
flask --app app.py run
```

To use development mode

```bash
flask --app app.py run --debug
```
