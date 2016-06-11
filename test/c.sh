#! /bin/bash

npm link
cd moa2
moag user username:string password:string avatar:string phone_number:string address:string -k && ava -v test/