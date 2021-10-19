const bubbleSort = function(ary){
	var history = [];
	var operations = [];
	for(var i = 0; i < ary.length; i++){
		for(var j = 0 ; j < ary.length - i - 1; j++){
			if(ary[j] > ary[j+1]){
				var tmp = ary[j+1];
				ary[j+1] = ary[j];
				ary[j] = tmp;
				history = history.concat([ary.slice()]);
				operations = operations.concat([[j, j+1]]);
			}
		}
	}
	return [history, operations];
}

const selectionSort = (ary) => {
	var history = [];
	var operations = [];
	var max_ = -1;
	var max_idnex = -1;
	for(var i = 0; i < ary.length; i++){
		max_ = -1;
		for(var j = 0 ; j < ary.length - i; j++){
			if(ary[j] > max_){
				max_ = ary[j];
				max_idnex = j;
			}
		}
		var tmp = ary[ary.length - i - 1];
		ary[ary.length - i - 1] = max_;
		ary[max_idnex] = tmp;
		history = history.concat([ary.slice()]);
		operations = operations.concat([[max_idnex, ary.length - i - 1]]);
	}
	return [history, operations];
}

const insertionSort = (ary) => {
	var history = [];
	var operations = [];
	var index = -1;
	for(var i = 0; i < ary.length; i++){
		index = i;
		var tmp = ary[i];
		for(var j = 0 ; j < i; j++){
			if(ary[j] > ary[i]){
				index = j;
				break;
			}
		}
		for(var k = i; k > index; k--){
			ary[k] = ary[k-1];
			history = history.concat([ary.slice()]);
			operations = operations.concat([[k, i-1]]);
		}
		ary[index] = tmp;
		history = history.concat([ary.slice()]);
		operations = operations.concat([[index, i]]);
	}
	return [history, operations];
}

const quickSort = (ary) => {
	var stack = []
	var history = [];
	var operations = [];
	var start = 0, end = ary.length - 1;
	stack.push([start, end]);
	while(stack.length > 0){
		
		[start, end] = stack.pop();

		var [pivot_index, history_, operations_] = partition(ary, start, end);
		history = history.concat(history_);
		operations = operations.concat(operations_);
		
		if(pivot_index - 1 > start){
			stack.push([start, pivot_index - 1]);
		}
		if(pivot_index + 1 < end){
			stack.push([pivot_index+1, end]);
		}
	}
	return [history, operations]

}

const swap = (A, a, b) =>{
	var tmp = A[a];
	A[a] = A[b];
	A[b] = tmp;
}

const partition = (input, start, end) => {

	var pivot = input[end];
	var pivot_index = start;
	var history = [];
	var operations = [];
	for(var i = start; i < end; i++){
		if(input[i] <= pivot){
			swap(input, i, pivot_index);
			history.push(input.slice());
			operations.push([i, pivot_index]);
			pivot_index += 1;
		}
	}
	swap(input, pivot_index, end);

	return [pivot_index, history, operations];
}

const mergeSort = (ary) => {

	var low = 0, high = ary.length - 1;

	var m = 1;
	var operations = [];
	var history = [];

	while(m <= high){


		for(var i = low; i <= high; i += 2 * m){
			var start = i;
			var mid = i + m - 1;
			var end = Math.min(high, i + m + m - 1);

			var [hist, ops] = merge(ary, start, mid, end);

			ary = hist.slice();
			history.push(hist);
			if(m * 2 <= high){
				operations.push(ops);	
			}else{
				operations.push([]);
			}
			
		}
		m *= 2;	
	}

	return [history, operations];

}

const merge = (input, start, mid, end) => {

	var tmp = [];

	var i = start, j = mid + 1;
	var operations = Array(end - start + 1).fill(null).map((value, index)=> {return index + start;});

	while(i <= mid && j <= end){
		if(input[i] <= input[j]){
			tmp.push(input[i]);
			i+=1;
		}else{
			tmp.push(input[j]);
			j+=1;
		}
	}
	while(i <= mid){
		tmp.push(input[i]);
		i+=1;
	}
	while(j <= end){
		tmp.push(input[j]);
		j+=1;
	}
	for(var k = start; k <= end; k++){
		input[k] = tmp[k - start];
	}
	return [input, operations];
}

export {bubbleSort, selectionSort, insertionSort, quickSort, mergeSort}

