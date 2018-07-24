#!/usr/bin/env bash

set -ex

source .bluemix/pipeline-COMMON.sh





function deploy_app {
    APP=$1
    if [ -f apps/${APP}/manifest.yml ]
    then
        deploy_cf_app ${APP}
    elif [ -f apps/${APP}/Dockerfile ]
    then
        deploy_docker_app ${APP}
    else
        echo unrecognized app type ${APP}
        exit 1
    fi
}

function deploy_cf_app {
    APP=$1
    echo deploying cloud foundry app ${APP}
    pushd apps/${APP}
    cf push ${APP} -i 1 -m 128M --no-start
    cf bind-service ${APP} ${BLOCKCHAIN_SERVICE_INSTANCE} -c '{"permissions":"read-only"}'
    popd
}




function start_apps {
    for APP in ${APPS}
    do
        start_app ${APP}
    done
}

function start_app {
    APP=$1
    if [ -f apps/${APP}/manifest.yml ]
    then
        start_cf_app ${APP}
    elif [ -f apps/${APP}/Dockerfile ]
    then
        start_docker_app ${APP}
    else
        echo unrecognized app type ${APP}
        exit 1
    fi
}

function start_cf_app {
    APP=$1
    echo starting cloud foundry app ${APP}
    pushd apps/${APP}
    cf set-env ${APP} REST_SERVER_URLS "${REST_SERVER_URLS}"
    cf start ${APP}
    popd
}

echo installinng NOdejs

install_nodejs
install_jq
echo installinngAngular
install_angularcli
../cf push "${CF_APP}" -b https://github.com/cloudfoundry/nodejs-buildpack



