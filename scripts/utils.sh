# todo: finalizar arquivo utils.sh
# https://gitlab.com/gitlab-org/gitlab/-/blob/master/scripts/utils.sh

function retry() {
	retry_times_sleep 2 3 "$@"
}

function retry_times_sleep() {
	number_of_retries="$1"
	shift
	sleep_seconds="$1"
	shift
	
	if eval "$@"; then
		return 0
	fi
	
	for i in $(seq "${number_of_retries}" -1 1); do
		sleep "$sleep_seconds"s
		echo "[$(date '+%H:%M:%S')] tentando novamente $i..."
		
		if eval "$@"; then
			return 0
		fi
	done
	
	return 1
}

# tentar novamente depois de 2s, 4s, 8s, 16s, 32s, 64s, 128s
function retry_exponential() {
	if eval "$@"; then
		return 0
	fi
	
	local sleep_time=0
	
	# a última tentativa será depois de 2**7 = 128 segundos (2min8s)
	for i in 1 2 3 4 5 6 7; do
		sleep_time=$((2 ** i))
		
		echo "dormir por $sleep_time segundos..."
		sleep $sleep_time
		echo "[$(date '+%H:%M:%S')] tentativa #$i..."
		
		if eval "$@"; then
			return 0
		fi
	done
	
	return 1
}

function test_url() {
	local url="${1}"
	local curl_args="${2}"
	local status
	local cmd="curl ${curl_args} --output /dev/null -L -s -w ''%{http_code}'' \"${url}\""
	
	status=$(eval "${cmd}")
	
	if [[ $status == "200" ]]; then
		return 0
	else
		curl -L --fail --output /dev/null "${url}"
		
		echo -e "\ncódigo de status http 200 esperado: recebido ${status}\n"
		
		return 1
	fi
}
