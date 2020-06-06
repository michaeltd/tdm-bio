#!/usr/bin/env bash
#
# pyhttpserv.bash Start an http server in current directory
# https://twitter.com/climagic/status/1224732676361461765
# python3 -m http.server 8080 # Start a simple webserver using python3 on external port 8080 and use the current directory you are in as the document root. Be careful with what you expose to the world. Use --bind 127.0.0.1 if you want to make it local only.
# Or the old days with python 2: python -m SimpleHTTPServer 8080

declare -r pv="$(python --version)"

if [[ "${pv}" =~ ^Python\ 3. ]]; then
    python -m http.server 8080 --bind 127.0.0.1
elif [[ "${pv}" =~ ^Python\ 2. ]]; then
    python -m SimpleHTTPServer 8080
else
    echo "!: No suitable python version found!" >&2
    exit 1
fi
