/// <reference path="../typings/tsd.d.ts"/>

describe('alembic/Factory', function() {
	it('alembic.Factory Defined?', function() {
		expect(alembic.Factory).toBeDefined();
	})

	it('alembic.Factory can be created?', function() {
		var factory = new alembic.Factory();
		expect(factory).not.toBeNull();
	})
})

describe('alembic/Factory', function() {
	var request = new XMLHttpRequest();
	var filename = '/base/spec/assets/Alembic_Octopus_Example/alembic_octopus.abc';

	beforeAll(function (done) {
		request.open('GET', filename, true);

		request.responseType = 'arraybuffer';
		request.addEventListener('loadend', function () {
			done();
		});

		request.overrideMimeType('application/octet-stream');
		request.send();
	})

	it('CoreType of alembic_octopus.abc is HDF5?', function() {
		var buffer = <ArrayBuffer>request.response;
		expect(buffer).not.toBeNull();

		// Unit Test 環境では、2 bytes offset して、3 byte 目を無視する.
		// http://qiita.com/wokia/items/4c6e3942d5cdaa3b97b4
		var offset = (environment.isLocalTesting())? 2 : 0;
		var stream = new DataViewStream(buffer, offset);
		[0x89, 0x48, 0x44, 0x46, 0x0d, 0x0a, 0x1a, 0x0a].forEach(function(value) {
			if ((!environment.isLocalTesting())&&(stream.getPosition() != 0)) {
				expect(stream.getUint8()).toEqual(value);
			}
		})
	})

	it('Archive can be getted from alembic_octopus.abc?', function() {
		var buffer = <ArrayBuffer>request.response;
		expect(buffer).not.toBeNull();

		var factory = new alembic.Factory();
		expect(factory).not.toBeNull();

		var archive = factory.getArchive(filename, buffer);
		expect(archive).not.toBeNull();
		//expect(archive.valid()).toBeTruthy();
	})
})
